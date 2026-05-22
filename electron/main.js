/* Processo principal do Electron.
   - Janela principal: calendário (index.html)
   - Janela widget: frameless, always-on-top, arrastável (widget.html)
   localStorage é compartilhado entre as janelas (mesma sessão), então o
   evento `storage` propaga as mudanças automaticamente.
*/

const { app, BrowserWindow, screen, Menu, shell } = require("electron");
const path = require("path");

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
        alwaysOnTop: true,
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

    // Mantém visível mesmo sobre janelas em fullscreen no Windows.
    widgetWindow.setAlwaysOnTop(true, "floating");
    widgetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    widgetWindow.loadFile(path.join(ROOT, "widget.html"));

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
