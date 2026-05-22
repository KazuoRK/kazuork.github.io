/* Processo principal do Electron.
   - Janela principal: calendário (index.html)
   - Janela widget: frameless, always-on-top, arrastável (widget.html)
   localStorage é compartilhado entre as janelas (mesma sessão), então o
   evento `storage` propaga as mudanças automaticamente.
*/

const { app, BrowserWindow, screen, Menu, shell, ipcMain } = require("electron");
const path = require("path");
const { execFile } = require("child_process");

/** Empurra a janela para o fundo da ordem-Z no Windows (SetWindowPos HWND_BOTTOM).
 *  Best effort — em caso de falha, segue como janela normal. */
function sendToBackOnWindows(win) {
    if (process.platform !== "win32" || !win || win.isDestroyed()) return;
    let hwnd;
    try {
        const buf = win.getNativeWindowHandle();
        // x64: HWND ocupa 8 bytes; x86: 4 bytes. Lemos como inteiro positivo.
        hwnd = buf.length >= 8 ? buf.readBigUInt64LE(0).toString() : buf.readUInt32LE(0).toString();
    } catch { return; }
    const ps = [
        "$sig = '[DllImport(\"user32.dll\")] public static extern bool SetWindowPos(IntPtr h, IntPtr a, int x, int y, int w, int t, uint f);';",
        "$w = Add-Type -MemberDefinition $sig -Name W -PassThru;",
        `[void]$w::SetWindowPos([IntPtr]${hwnd}, [IntPtr]1, 0, 0, 0, 0, 0x0013)`
    ].join(" ");
    execFile("powershell.exe", ["-NoProfile", "-WindowStyle", "Hidden", "-Command", ps],
        { windowsHide: true }, () => { /* ignora erros */ });
}

const ROOT = path.join(__dirname, "..");
const PRELOAD = path.join(__dirname, "preload.js");

let mainWindow = null;
let widgetWindow = null;

function createMainWindow() {
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

    // Quando o renderer chamar window.open("widget.html", "PagamentosWidget", ...),
    // interceptamos e criamos a janela widget no lugar do popup padrão.
    mainWindow.webContents.setWindowOpenHandler(({ url, frameName }) => {
        if (url.endsWith("widget.html") || frameName === "PagamentosWidget") {
            openWidget();
            return { action: "deny" };
        }
        // Abre links externos no navegador padrão.
        if (/^https?:\/\//i.test(url)) {
            shell.openExternal(url);
            return { action: "deny" };
        }
        return { action: "deny" };
    });

    mainWindow.on("closed", () => { mainWindow = null; });
}

function openWidget() {
    if (widgetWindow && !widgetWindow.isDestroyed()) {
        widgetWindow.show();
        widgetWindow.focus();
        return;
    }

    const display = screen.getPrimaryDisplay();
    const { workArea } = display;
    const w = 340, h = 560;
    const x = workArea.x + workArea.width - w - 24;
    const y = workArea.y + 24;

    widgetWindow = new BrowserWindow({
        width: w,
        height: h,
        x, y,
        minWidth: 280,
        minHeight: 360,
        frame: false,
        transparent: false,
        resizable: true,
        alwaysOnTop: false,
        skipTaskbar: false,
        backgroundColor: "#0b1220",
        title: "Pagamentos · Widget",
        webPreferences: {
            preload: PRELOAD,
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    // Visível em todas as áreas de trabalho virtuais, mas SEM ficar por cima
    // das outras janelas. Para fixar no topo, use o botão 📌 dentro do widget.
    widgetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });

    widgetWindow.loadFile(path.join(ROOT, "widget.html"));

    // Manda pro fundo da Z-order assim que aparece, e sempre que perder foco —
    // assim o widget passa a viver "atrás" das outras janelas, como um widget
    // de área de trabalho. O usuário pode forçar "no topo" com o botão 📌.
    widgetWindow.once("ready-to-show", () => {
        if (!widgetWindow.isAlwaysOnTop()) sendToBackOnWindows(widgetWindow);
    });
    widgetWindow.on("blur", () => {
        if (widgetWindow && !widgetWindow.isAlwaysOnTop()) sendToBackOnWindows(widgetWindow);
    });

    widgetWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.endsWith("index.html")) {
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.show();
                mainWindow.focus();
            } else {
                createMainWindow();
            }
            return { action: "deny" };
        }
        return { action: "deny" };
    });

    widgetWindow.on("closed", () => { widgetWindow = null; });
}

// IPC para o widget controlar o próprio "sempre no topo".
ipcMain.handle("widget:setAlwaysOnTop", (e, flag) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (!win) return false;
    win.setAlwaysOnTop(!!flag, "floating");
    if (!flag) sendToBackOnWindows(win);
    return win.isAlwaysOnTop();
});
ipcMain.handle("widget:isAlwaysOnTop", (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    return win ? win.isAlwaysOnTop() : false;
});

app.whenReady().then(() => {
    // Menu mínimo (Windows).
    Menu.setApplicationMenu(null);
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on("window-all-closed", () => {
    // No Windows/Linux encerra ao fechar tudo; no macOS mantém vivo.
    if (process.platform !== "darwin") app.quit();
});
