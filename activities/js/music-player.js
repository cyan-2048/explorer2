var audio = document.querySelector("audio")

window.addEventListener("keydown",(e)=>{

  

  switch (e.key) {
    case "Enter":
    if (audio.paused){
      audio.play()
    } else {
      audio.pause()
      
    }
      break;
    case "ArrowLeft":
      if (screen.orientation.type.includes("landscape")){
        if (audio.volume != 0){
          audio.volume = Number(audio.volume - 0.1).toFixed(1)
        }
        volchum()
      }
      if (screen.orientation.type.includes("portrait")){
        audio.currentTime = audio.currentTime - 10
      }
      break;
    case "ArrowRight":
      if (screen.orientation.type.includes("landscape")){
        if (audio.volume != 1){
          audio.volume = Number(audio.volume + 0.1).toFixed(1)
        }
        volchum()
      }
      if (screen.orientation.type.includes("portrait")){
        audio.currentTime = audio.currentTime + 10
      }
      break;
    case "ArrowUp":
      if (screen.orientation.type.includes("portrait")){
        if (audio.volume != 1){
          audio.volume = Number(audio.volume + 0.1).toFixed(1)
        }
        volchum()
      }
      if (screen.orientation.type.includes("landscape")){
        audio.currentTime = audio.currentTime - 10
      }
      break;
    case "ArrowDown":
      if (screen.orientation.type.includes("portrait")){
        if (audio.volume != 0){
          audio.volume = Number(audio.volume - 0.1).toFixed(1)
        }
        volchum()
      }
      if (screen.orientation.type.includes("landscape")){
        audio.currentTime = audio.currentTime + 10
      }
      break;
    case "#":
      navigator.volumeManager.requestUp()
      break;
    case "*":
      navigator.volumeManager.requestDown()
      break;
    
    case "1":
      if (ikdk0 != 0){
        ikdk0 = ikdk0 - 1
      }
      changeRate()
      break;
    case "3":
      if (ikdk0 < 7){
        ikdk0 = ikdk0 + 1
      }
      changeRate()
      break;
    case "":
      
      break;
    case "":
      
      break;
    case "":
      
      break;
    case "":
      
      break;
  }
})

var volfed;

function changeRate(){
  audio.playbackRate = ikdk[ikdk0]
}

function volchum(){
  clearTimeout(volfed)
  document.getElementById("bolyum").style.opacity = "1"
  volfed = setTimeout(()=>{
    document.getElementById("bolyum").style.opacity = "0"
  },1500)
}

audio.addEventListener("volumechange",(e)=>{

  var vol = e.target.volume

  

  document.getElementById("prog").style.height = vol * 100 + "%"
  document.getElementById("sth2").innerHTML = vol * 10
  if (vol == 1){
    document.getElementById("chevup").style.opacity = "0.7"
    document.getElementById("chevdown").style.opacity = "1"
  } else if (vol == 0) {
    document.getElementById("chevdown").style.opacity = "0.7"
    document.getElementById("chevup").style.opacity = "1"
  } else {
    document.getElementById("chevdown").style.opacity = "1"
    document.getElementById("chevup").style.opacity = "1"
  }
})

var ikdk0 = 3;
var ikdk = [0.25 , 0.5 , 0.75, 1 , 1.25 , 1.5 , 1.75 , 2]

audio.ontimeupdate = (e) => {
  var progress = (e.target.currentTime / e.target.duration) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('current-duration').innerHTML = convertTime(e.target.currentTime);
  document.getElementById('total-duration').innerHTML = convertTime(e.target.duration);
}

function convertTime(time) {
  if (isNaN(time)) {
    return '00:00';
  }
  var mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  return mins + ':' + secs;
}

audio.onplay = ()=>{
  document.getElementById("pause").style.display = "block"
  document.getElementById("play").style.display = "none"
}
audio.onpause = ()=>{
  document.getElementById("play").style.display = "block"
  document.getElementById("pause").style.display = "none"
}

var audioBlob = null;

function audioInit(){
  if (audioBlob){
    audio.src = URL.createObjectURL(audioBlob);
    audio.load()
    setTimeout(() => {
      audio.currentTime = 0
    }, 100);
    
    jsmediatags.read(audioBlob, {
      onSuccess: function(tag) {
        tagz = tag
        if (tag.tags.picture){
          const { data, format } = tag.tags.picture;
          let base64String = "";
          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          document.getElementById("actualart").style.backgroundImage = `url(data:${data.format};base64,${window.btoa(base64String)})`;
          
        }
        if (tag.tags.title){
          document.getElementById("titulo").innerHTML = tag.tags.title
        }
        if (tag.tags.artist){
          document.getElementById("artista").innerHTML = tag.tags.artist
        }
      },
      onError: function(error) {
        console.log(error);
      }
    });
  }
}

navigator.mozSetMessageHandler('activity', function(a) {
  req = a
  console.log(req)
  if (req.source.data.blob){
    audioBlob = req.source.data.blob
    audioInit()
  }

})