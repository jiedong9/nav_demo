const $itemList = $('.firstList')
const $lastitem = $itemList.find('.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
]
// 网址处理
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}
const render = () => {
    $itemList.find('.item:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $item = $(
            `<div class="item">
                <div class="site">${node.logo}</div>
                <a href="${simplifyUrl(node.url)}">${simplifyUrl(node.url)}</a>
                <div class="close">
                <svg class="close-icon">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
                </div>
            </div>`
        ).insertBefore($lastitem)
        $item.on('click', () => {
            window.open(node.url)
        })
        $item.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })

    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('添加经常访问的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

// 键盘事件
$(document).on('keypress', (e) => {
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})