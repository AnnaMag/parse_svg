var cheerio = require('cheerio')
var fs = require('fs')

function extract(contents) {
    var $ = cheerio.load(contents, {xmlMode: true })

    var fullpath = ''
    $('path').each(function() {
        var d = $(this).attr('d')
        fullpath += d.replace(/\s+/g, ' ')+' '
    })
    return fullpath.trim()
}

module.exports = function(file, opt) {
    opt = opt||{}
    if (!opt.encoding)
        opt.encoding = 'utf8'
    var contents = fs.readFileSync(file, opt.encoding)
    return extract(contents, opt)
}
