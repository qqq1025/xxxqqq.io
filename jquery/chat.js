$(function () {
  //初始右侧滚动条
  //这个方法定义再scroll.js钟
  resetui();

  //为发送按钮绑定鼠标点击事件
  $('#btnSend').on('click', function () {
    var text = $('#ipt').val().trim()
    if (text.length <= 0) {
      return $('#ipt').val('')
    }

    //如果用户输入了内容 则将内容追加到页面上同时清空输入栏
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
    $('#ipt').val('')
    //重置滚轮位置
    resetui()
    //发起请求，获取聊天内容
    getMesg(text);
  })

  //获取聊天机器人发送回来的消息

  function getMesg(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        console.log(res);
        if (res.message === 'success') {
          //接收聊天消息
          var msg = res.data.info.text
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
        }
        //重置滚动条位置
        resetui();
        // 机器人对应的语音接口http://www.liulongbin.top:3006/api/synthesize
        //使用getVoice函数 把文本转化为语言
        getVoice(text)
      }
    })
  }


  //把文字转换成语音播放
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        console.log(res);
        // 
        if (res.status === 200) {
          //播放语言
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  //让文本输入框响应回车事件后 提交消息
  //为文本框绑定keyup事件
  $('#ipt').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#btnSend').click()
    }
  })


})