var video = document.querySelector("video")

// afile = navigator.getDeviceStorages("sdcard")[1].get("feelspeciar.srt")
// afile.onsuccess = ()=>{
//   var reader = new FileReader();
//   reader.readAsText(afile.result);
//   reader.onload = () => {
//     const _vtt = srt2webvtt(reader.result);
//     console.log(_vtt)
//     var _vttBlob = new Blob([_vtt], {type: "text/vtt"});
//   
//     const track = document.createElement("track");
//     track.kind = "captions";
//     track.label = "English";
//     track.srclang = "en";
//     track.src = URL.createObjectURL(_vttBlob);
//     track.setAttribute('default', true);
//     track.addEventListener("load", function() {
//       this.mode = "hidden";
//       video.textTracks[0].mode = "hidden";
//     });
//     video.appendChild(track);  
//   }
// 
// }

// a_file = navigator.getDeviceStorages("sdcard")[1].get("cat.mp4")
// a_file.onsuccess = ()=>{
//    video.querySelector("source").src = URL.createObjectURL(a_file.result);
//    video.load()
//    setTimeout(lud,500)
// }

  document.getElementById("cap").classList.add("caps")
 var controlfed = setTimeout(()=>{
   document.getElementById("controls").style.opacity = "0"
   document.getElementById("cap").classList.remove("caps")
  },3000)

window.addEventListener("keydown",(e)=>{

  clearTimeout(controlfed)
  document.getElementById("controls").style.opacity = "1"
  document.getElementById("cap").classList.add("caps")
  setTimeout(()=>{
    if (video.paused == false){
      controlfed = setTimeout(()=>{
        document.getElementById("controls").style.opacity = "0"
        document.getElementById("cap").classList.remove("caps")
      },3000)
    }
  },100)
  
  

  switch (e.key) {
    case "Enter":
    if (video.paused){
      video.play()
    } else {
      video.pause()
      
    }
      break;
    case "ArrowLeft":
      if (screen.orientation.type.includes("landscape")){
        if (video.volume != 0){
          video.volume = Number(video.volume - 0.1).toFixed(1)
        }
      }
      break;
    case "ArrowRight":
      if (screen.orientation.type.includes("landscape")){
        if (video.volume != 1){
          video.volume = Number(video.volume + 0.1).toFixed(1)
        }
      }
      break;
    case "ArrowUp":
      if (screen.orientation.type.includes("portrait")){
        if (video.volume != 1){
          video.volume = Number(video.volume + 0.1).toFixed(1)
        }
      }
      break;
    case "ArrowDown":
      if (screen.orientation.type.includes("portrait")){
        if (video.volume != 0){
          video.volume = Number(video.volume - 0.1).toFixed(1)
        }
      }
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

video.onplay = ()=>{
  document.getElementById("pause").style.display = "block"
  document.getElementById("play").style.display = "none"
}
video.onpause = ()=>{
  document.getElementById("play").style.display = "block"
  document.getElementById("pause").style.display = "none"
}

var volfed;

video.addEventListener("volumechange",(e)=>{

  var vol = e.target.volume

  clearTimeout(volfed)
  document.getElementById("bolyum").style.opacity = "1"
  volfed = setTimeout(()=>{
    document.getElementById("bolyum").style.opacity = "0"
  },1500)

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

var subtitle = false;

function lud(){
  if ((navigator.userAgent.toLowerCase()).includes("kaios")){
    document.body.requestFullscreen();
    if (video.videoWidth > video.videoHeight){
      screen.orientation.lock('landscape-primary')
    } else {
      screen.orientation.lock('portrait-primary')
    }
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("hokuspokus").focus()
});

function srt2webvtt(data) {
  var srt = data.replace(/\r+/g, '');
  srt = srt.replace(/^\s+|\s+$/g, '');
  var cuelist = srt.split('\n\n');
  var result = "";
  if (cuelist.length > 0) {
    result += "WEBVTT\n\n";
    for (var i = 0; i < cuelist.length; i=i+1) {
      result += convertSrtCue(cuelist[i]);
    }
  }
  return result;
}

function convertSrtCue(caption) {
  var cue = "";
  var s = caption.split(/\n/);
  while (s.length > 3) {
      for (var i = 3; i < s.length; i++) {
          s[2] += "\n" + s[i]
      }
      s.splice(3, s.length - 3);
  }
  var line = 0;
  if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
    cue += s[0].match(/\w+/) + "\n";
    line += 1;
  }
  if (s[line].match(/\d+:\d+:\d+/)) {
    var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
    if (m) {
      cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> "
            +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+"\n";
      line += 1;
    } else {
      return "";
    }
  } else {
    return "";
  }
  if (s[line]) {
    cue += s[line] + "\n\n";
  }
  return cue;
}

var CURRENT_CUE = null;

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

video.play();
video.pause();

var rotasyon = true

video.ontimeupdate = (e) => {
  var progress = (e.target.currentTime / e.target.duration) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('current-duration').innerHTML = convertTime(e.target.currentTime);
  document.getElementById('total-duration').innerHTML = "/ " + convertTime(e.target.duration);
//  RESUME_LOGS[id] = e.target.currentTime
//  localforage.setItem('RESUME_LOGS', RESUME_LOGS);

  
  if (e.target.currentTime >= 1 && rotasyon){
    lud();
    rotasyon = false
  }

  if (subtitle) {
    const caption = document.querySelector('#cap div');
    if (video.textTracks[0]) {
      if (video.textTracks[0].activeCues[0]) {
        if (CURRENT_CUE != video.textTracks[0].activeCues[0].text) {
          CURRENT_CUE = video.textTracks[0].activeCues[0].text;
          caption.innerHTML = CURRENT_CUE;
          caption.style.visibility = 'visible';
        }
      } else {
        if (CURRENT_CUE != null) {
          CURRENT_CUE = null;
          caption.innerHTML = '';
          caption.style.visibility = 'hidden';
        }
      }
    } else {
      if (CURRENT_CUE != null) {
        CURRENT_CUE = null;
        caption.innerHTML = '';
        caption.style.visibility = 'hidden';
      }
    }
  }
}

var testlangfo = null;

navigator.mozSetMessageHandler('activity', function(activityReq) {
  console.log(activityReq)
  testlangfo = activityReq;
  var option = activityReq.source;
  wops = ["pris@open","view","open"]
  if (wops.indexOf(option.name) != -1 || option.name == "pris@open") {
    if (activityReq.source.data.blob){
      video.querySelector("source").src = URL.createObjectURL(activityReq.source.data.blob);
      video.querySelector("source").type = activityReq.source.data.blob.type
      video.load()
      setTimeout(lud,1000)
      setTimeout(()=>{video.play()},800)
    }
    if (activityReq.source.data.sub){
      var reader = new FileReader();
      reader.readAsText(activityReq.source.data.sub);
      reader.onload = () => {
        if (reader.result.includes("WEBVTT") != true){
          const _vtt = srt2webvtt(reader.result);
          console.log(_vtt)
          var _vttBlob = new Blob([_vtt], {type: "text/vtt"}); 
        } else {
          var _vttBlob = activityReq.source.data.sub
        }
         
        const track = document.createElement("track");
        track.kind = "captions";
        track.label = "English";
        track.srclang = "en";
        track.src = URL.createObjectURL(_vttBlob);
        track.setAttribute('default', true);
        track.addEventListener("load", function() {
          this.mode = "hidden";
          video.textTracks[0].mode = "hidden";
        });
        video.appendChild(track);
        subtitle = true
      }
    }
    
  }
})