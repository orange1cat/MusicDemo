var audio = document.getElementById('audio')
var lyricText = document.getElementById('geci')

let lyric0 = getLyric("lrc/眼泪的错觉.lrc")
let backup = parseLyric(lyric0)
// 使用slice() 或者 concat()来实现一维数组的深拷贝
// 但这种方法只适用于一维数组，对多维数组无效
let lyrc
// console.log(lyric)

audio.ontimeupdate = () => {

    if (audio.currentTime - 0 < 0.2) {
        lyric = deecopy(backup)
    }
    for (var i = 0, l = lyric.length; i < l; i++) {

        if (audio.currentTime > lyric[i][0]) {
            // lyricText.style.animationPlayState = 'running'
            lyricText.classList.add('restart')
            lyricText.innerHTML = lyric[i][1]
            lyric[i][0] = 300 // 关键的一步
            setTimeout(() => { lyricText.classList.remove('restart') }, 3000)

        }

    }
}


function deecopy(obj) {
    var res = []
    for (var i = 0, len = obj.length; i < len; i++) {
        if (obj[i] instanceof Array) {
            res[i] = deecopy(obj[i])
        }
        else res[i] = obj[i]
    }
    return res
}

function getLyric(url) {
    // 建立 XMLHttpRequest(Ajax)请求
    request = new XMLHttpRequest()
    var okStatus = document.location.protocol === "file:" ? 0 : 200
    request.open('GET', url, false) // true 异步
    request.send(null)
    return request.status === okStatus ? request.responseText : null

}


function parseLyric(text) {
    var lines = text.split('\n')
    // 匹配时间的正则
    pattern = /\[\d{2}:\d{2}.\d{2}\]/g

    result = []
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1)
    }

    lines.forEach(function (v, i, a) {

        var value = v.replace(pattern, '')
        var time = v.replace(value, '')
        time = time.replace('[', '')
        time = time.replace(']', '')
        time = time.split(':')

        result.push([parseInt(time[0], 10) * 60 + parseFloat(time[1]), value])
    })

    return result
}