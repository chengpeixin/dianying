const open = require('open')
const local = require('address').ip('lo')
function openBrowser(defaultPort){
    const port = defaultPort|| '8080'
    var uri = `http://${local||'localhost'}:${port}`
    open(uri)
}

module.exports = openBrowser