var AUDIO = 'on';
var URL = 'api/'; //提取地址公共url
window.onload = function() {
    // 音频处理
    var voice = document.getElementById("bgm");
        //调用 <audio> 元素提供的方法 play()
        voice.play();
        //判斷 WeixinJSBridge 是否存在
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            voice.play();
        } else {
            //監聽客户端抛出事件"WeixinJSBridgeReady"
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", function() {
                    voice.play();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", function() {
                    voice.play();
                });
                document.attachEvent("onWeixinJSBridgeReady", function() {
                    voice.play();
                });
            }
        }

        //voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
        var voiceStatu = true;
        //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
        document.addEventListener("touchstart", function(e) {
            if (voiceStatu) { 
                voice.play();
                voiceStatu = false;
            }
        }, false);
    $('.music').on('click', function() {
        if (AUDIO === 'on') {
            AUDIO = 'stop';
            voice.pause();
            $(this).attr('src', './image/music_s.png');
        } else {
            AUDIO = 'on';
            voice.play();
            $(this).attr('src', './image/music.png');
        }
    });
    // 安卓禁止长按出现"在浏览器打开"
    // $('.example').bind('contextmenu', function(e) {
    //     e.preventDefault();
    // });
}