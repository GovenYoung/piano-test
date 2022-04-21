import {
  defaultMusicSrc,
} from './defaultData.js';

var $keysList = document.getElementsByClassName('key');

function MusicPlay(defaultMusicSrc, key) {
  return new Promise((resplve, reject) => {
    if (defaultMusicSrc[key]) {
      let newAudio = new Audio();
      newAudio.src = defaultMusicSrc[key].src; //设置播放的地址
      newAudio.autoplay = true; //加载完成后立即播放
      // newAudio.play(); //播放音频
      newAudio.addEventListener("ended", () => { //音频播放完毕
        newAudio.removeEventListener("ended", () => { });
        newAudio = null; //销毁
      });
      resplve();
    } else {
      reject("无此音乐文件");
    };
  });
};

//键盘控件点击
function clickMusicKnock(e) {
  console.log(1)
  let key = e.target.className.split("num")[1];
  //调用播放的方法
  MusicPlay(defaultMusicSrc, key).then(
    () => {
      // console.log("播放成功")
    },
    (err) => {
      // console.log("播放失败:", err)
    },
  )
};

for (let i in $keysList) {
  if (typeof $keysList[i] == "object") {
    $keysList[i].addEventListener("touchstart", (e) => clickMusicKnock(e))
  }
}
