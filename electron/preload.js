/* Preload — expõe APIs mínimas via contextBridge. Sandbox e contextIsolation ativos. */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("widgetAPI", {
    setMode: (mode) => ipcRenderer.invoke("widget:setMode", mode),
    getMode: () => ipcRenderer.invoke("widget:getMode")
});

contextBridge.exposeInMainWorld("appAPI", {
    toggleWidget: () => ipcRenderer.invoke("widget:toggle"),
    isWidgetOpen: () => ipcRenderer.invoke("widget:isOpen"),
    onWidgetState: (cb) => {
        ipcRenderer.on("widget:state", (_e, state) => cb(state));
    }
});
