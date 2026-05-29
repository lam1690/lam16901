contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform
})