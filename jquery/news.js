$(function () {

    //给时间补零函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }
    //定义格式化时间的过滤器
    template.defaults.imports.dataFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            if (res.status !== 200) {
                return alert('获取新闻列表失败')
            }
            for (var i = 0, length = res.data.length; i < length; i++) {
                //把每一项的tags属性，从字符串改造成字符串的数组
                res.data[i].tags = res.data[i].tags.split(',')
            }
            // console.log(res);
            var htmlstr = template('tpl-news', res)
            $('#news-list').html(htmlstr)
        })

    }
    getNewsList()
})