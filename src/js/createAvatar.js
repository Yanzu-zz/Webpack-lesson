var avatar = require('../imgs/avatar.png')
var avatar2 = require('../imgs/download.png')

function createAvatar() {
    var dom = document.getElementById('main')

    var img = document.createElement('img')
    img.src = avatar.default
    img.classList.add('avatar')
    dom.append(img)

    var img2 = document.createElement('img')
    img2.src = avatar2.default
    dom.append(img2)
}

module.exports = createAvatar