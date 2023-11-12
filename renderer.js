const opendbBtn = document.getElementById('opendb-btn')
const filePathElement = document.getElementById('filePath')

opendbBtn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})