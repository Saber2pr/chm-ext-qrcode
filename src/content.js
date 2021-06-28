let x = 0
let y = 0

window.addEventListener('contextmenu', event => {
  x = event.clientX
  y = event.clientY
})

window.addEventListener('error', event => {
  const filename = event.filename
  if (filename.startsWith('chrome-extension://')) {
    alert(event.error)
  }
})

/**
 * @returns {HTMLElement}
 */
const getClickElement = () => document.elementFromPoint(x, y)

let qrcode = null

/**
 * @param {HTMLElement} element 
 */
const editQrcodeElement = (element) => {
  if (element) {
    const isImg = element.tagName.toLowerCase() === 'img'
    const isCanvas = element.tagName.toLowerCase() === 'canvas'
    const backgroundImage = isCanvas ? element.toDataURL('image/png') : isImg ? element.src : element.style.backgroundImage
    if (backgroundImage) {
      const base64 = backgroundImage.replace(/^url\([\s\S].*?base64,/, '').replace(/"\)$/, '')
      qrcodeParser(base64).then(res => {
        const url = res.data
        const newUrl = window.prompt('Edit Qrcode Value:', url)
        if (newUrl) {
          /** @type {HTMLCanvasElement} **/
          const canvas = new AraleQRCode({
            text: newUrl,
            width: element.clientWidth,
            height: element.clientHeight,
            render: 'canvas',
          })
          const newBase64 = canvas.toDataURL('image/png')
          if (isImg) {
            element.src = newBase64
          } else if (isCanvas) {
            element.parentElement.replaceChild(canvas, element)
          }
          else {
            element.style.backgroundImage = `url(${newBase64})`
          }
        }
      })
    }
  }
}

const COM_QRCODE = 'Qrcode Edit'
const COM_QUERY = 'querySelector'

onMessage(info => {
  if (info.menuItemId === COM_QRCODE) {
    editQrcodeElement(getClickElement())
  }
  if (info.menuItemId === COM_QUERY) {
    const selector = window.prompt('Query a qrcode element:')
    if (selector) {
      const element = document.querySelector(selector)
      element && editQrcodeElement(element)
    }
  }
})
