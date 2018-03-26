const cp = require('child_process')
const {
    resolve
} = require('path')

;
(async () => {
    const script = resolve(__dirname, '../crawler/video')
    const child = cp.fork(script, [])
    let invoked = false

    child.on('error', err => {
        if (invoked) return
        invoked = true
    })
    child.on('exit', code => {
        if (invoked) return
        invoked = true
        let err = code === 0 ? 'is ok' : new Error('exit code' + code)
        console.log(err)
    })
    child.on('message', data => {
        // let result = data.result
        //https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512933684.jpg
        console.log(data)
    })
})()