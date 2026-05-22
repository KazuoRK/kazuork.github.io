/* Preload — expõe ao widget uma API mínima via contextBridge para alternar
   o modo "sempre no topo" pelo botão 📌. Sandbox e contextIsolation ficam
   ativos: no renderer só aparece `window.widgetAPI`. */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("widgetAPI", {
    setAlwaysOnTop: (flag) => ipcRenderer.invoke("widget:setAlwaysOnTop", !!flag),
    isAlwaysOnTop: () => ipcRenderer.invoke("widget:isAlwaysOnTop")
});
