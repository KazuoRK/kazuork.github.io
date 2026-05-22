/* Processo principal do Electron.
   - Janela principal (index.html): calendário completo.
   - Janela widget (widget.html): no Windows, fica "fixada no desktop" — usamos
     SetParent(hwnd, WorkerW) via PowerShell para que ela vire filha do shell
     do desktop, vivendo entre o papel de parede e os ícones. Assim:
       • outros apps NÃO cobrem o widget (porque ele é parte do desktop)
       • Win+D mostra ele junto com a área de trabalho
       • Alt-Tab não inclui ele
   O usuário pode forçar "sempre no topo" pelo botão 📌 dentro do widget,
   e abrir/fechar pelo botão no app principal.
*/

const { app, BrowserWindow, Menu, screen, shell, ipcMain } = require("electron");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.join(__dirname, "..");
const PRELOAD = path.join(__dirname, "preload.js");
const IS_WIN = process.platform === "win32";

let mainWindow = null;
let widgetWindow = null;
let widgetMode = "desktop"; // "desktop" (padrão) ou "ontop"

/* ============================================================
   WorkerW pinning via PowerShell
   ============================================================ */

function hwndOf(win) {
    try {
        const buf = win.getNativeWindowHandle();
        return buf.length >= 8
            ? buf.readBigUInt64LE(0).toString()
            : buf.readUInt32LE(0).toString();
    } catch { return null; }
}

function runPowerShell(script) {
    return new Promise((resolve) => {
        const b64 = Buffer.from(script, "utf16le").toString("base64");
        execFile("powershell.exe",
            ["-NoProfile", "-WindowStyle", "Hidden", "-EncodedCommand", b64],
            { windowsHide: true, timeout: 10000 },
            (err, stdout, stderr) => resolve({ err, stdout, stderr })
        );
    });
}

const PINVOKE = `
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WW {
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern IntPtr FindWindow(string a, string b);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern IntPtr FindWindowEx(IntPtr p, IntPtr c, string a, string b);
    [DllImport("user32.dll")] public static extern IntPtr SendMessageTimeout(IntPtr h, uint m, IntPtr w, IntPtr l, uint f, uint t, out IntPtr r);
    [DllImport("user32.dll")] public static extern IntPtr SetParent(IntPtr c, IntPtr p);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc e, IntPtr l);
    public delegate bool EnumWindowsProc(IntPtr h, IntPtr l);
}
"@ -ErrorAction SilentlyContinue
`;

async function pinToDesktop(win) {
    if (!IS_WIN || !win || win.isDestroyed()) return false;
    const hwnd = hwndOf(win);
    if (!hwnd) return false;
    const script = `
$ErrorActionPreference = 'SilentlyContinue'
${PINVOKE}
$progman = [WW]::FindWindow("Progman", $null)
if ($progman -eq [IntPtr]::Zero) { exit 1 }
$r = [IntPtr]::Zero
[void][WW]::SendMessageTimeout($progman, 0x052C, [IntPtr]0xD, [IntPtr]0x1, 0, 1000, [ref]$r)

$global:wkw = [IntPtr]::Zero
$cb = [WW+EnumWindowsProc]{
    param($h, $l)
    $dv = [WW]::FindWindowEx($h, [IntPtr]::Zero, "SHELLDLL_DefView", $null)
    if ($dv -ne [IntPtr]::Zero) {
        $global:wkw = [WW]::FindWindowEx([IntPtr]::Zero, $h, "WorkerW", $null)
    }
    return $true
}
[void][WW]::EnumWindows($cb, [IntPtr]::Zero)
if ($global:wkw -eq [IntPtr]::Zero) { $global:wkw = $progman }
[void][WW]::SetParent([IntPtr]${hwnd}, $global:wkw)
`;
    const { err } = await runPowerShell(script);
    return !err;
}

async function unpinFromDesktop(win) {
    if (!IS_WIN || !win || win.isDestroyed()) return false;
    const hwnd = hwndOf(win);
    if (!hwnd) return false;
    const script = `${PINVOKE}
[void][WW]::SetParent([IntPtr]${hwnd}, [IntPtr]::Zero)
`;
    const { err } = await runPowerShell(script);
    return !err;
}

/* ============================================================
   Janelas
   ============================================================ */

function createMainWindow() {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show(); mainWindow.focus();
        return;
    }
    mainWindow = new BrowserWindow({
        width: 1180,
        height: 780,
        minWidth: 900,
        minHeight: 600,
        backgroundColor: "#0b1220",
        title: "Calendário de Pagamentos",
        autoHideMenuBar: true,
        webPreferences: {
            preload: PRELOAD,
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    mainWindow.loadFile(path.join(ROOT, "index.html"));

    mainWindow.webContents.setWindowOpenHandler(({ url, frameName }) => {
        if (url.endsWith("widget.html") || frameName === "PagamentosWidget") {
            openWidget();
            return { action: "deny" };
        }
        if (/^https?:\/\//i.test(url)) {
            shell.openExternal(url);
            return { action: "deny" };
        }
        return { action: "deny" };
    });

    mainWindow.on("closed", () => { mainWindow = null; });
}

async function openWidget() {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
        widgetWindow.show();
        return;
    }

    const display = screen.getPrimaryDisplay();
    const { workArea } = display;
    const w = 340, h = 560;
    const x = workArea.x + workArea.width - w - 24;
    const y = workArea.y + 24;

    widgetWindow = new BrowserWindow({
        width: w, height: h, x, y,
        minWidth: 280, minHeight: 360,
        frame: false,
        transparent: false,
        resizable: true,
        alwaysOnTop: false,
        skipTaskbar: true,
        focusable: true,
        backgroundColor: "#0b1220",
        title: "Pagamentos · Widget",
        webPreferences: {
            preload: PRELOAD,
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    widgetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
    widgetWindow.loadFile(path.join(ROOT, "widget.html"));

    widgetWindow.once("ready-to-show", async () => {
        if (widgetMode === "desktop") await pinToDesktop(widgetWindow);
        else widgetWindow.setAlwaysOnTop(true, "floating");
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send("widget:state", { open: true });
        }
    });

    widgetWindow.on("closed", () => {
        widgetWindow = null;
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send("widget:state", { open: false });
        }
    });

    widgetWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.endsWith("index.html")) {
            createMainWindow();
            return { action: "deny" };
        }
        return { action: "deny" };
    });
}

async function closeWidget() {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
        // Solta do WorkerW antes de fechar para evitar deixar "fantasma".
        if (IS_WIN) await unpinFromDesktop(widgetWindow);
        widgetWindow.close();
    }
}

async function setWidgetMode(mode) {
    if (!widgetWindow || widgetWindow.isDestroyed()) {
        widgetMode = mode;
        return widgetMode;
    }
    if (mode === "ontop") {
        if (IS_WIN) await unpinFromDesktop(widgetWindow);
        widgetWindow.setAlwaysOnTop(true, "floating");
    } else {
        widgetWindow.setAlwaysOnTop(false);
        if (IS_WIN) await pinToDesktop(widgetWindow);
    }
    widgetMode = mode;
    return widgetMode;
}

/* ============================================================
   IPC
   ============================================================ */

ipcMain.handle("widget:setMode", async (_e, mode) =>
    setWidgetMode(mode === "ontop" ? "ontop" : "desktop")
);
ipcMain.handle("widget:getMode", () => widgetMode);
ipcMain.handle("widget:isOpen", () => !!(widgetWindow && !widgetWindow.isDestroyed()));
ipcMain.handle("widget:toggle", async () => {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
        await closeWidget();
        return false;
    }
    await openWidget();
    return true;
});

/* ============================================================
   Ciclo de vida
   ============================================================ */

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createMainWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on("before-quit", async (e) => {
    // Solta o widget do WorkerW antes de sair, para não deixar janela órfã
    // grudada no shell do desktop.
    if (IS_WIN && widgetWindow && !widgetWindow.isDestroyed()) {
        e.preventDefault();
        try { await unpinFromDesktop(widgetWindow); } catch {}
        widgetWindow.destroy();
        widgetWindow = null;
        app.quit();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
