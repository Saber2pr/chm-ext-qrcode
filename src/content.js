let x = 0
let y = 0

window.addEventListener('contextmenu', event => {
  x = event.clientX
  y = event.clientY
})

/**
 * @returns {HTMLElement}
 */
const getClickElement = () => document.elementFromPoint(x, y)

let qrcode = null

onMessage(data => {
  const element = getClickElement()
  if (element) {
    const isImg = element.tagName.toLowerCase() === 'img'
    const backgroundImage = isImg ? element.src : element.style.backgroundImage
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
          } else {
            element.style.backgroundImage = `url(${newBase64})`
          }
        }
      })
    }
  }
})
