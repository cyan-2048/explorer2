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


var subtitle = false;

function lud(){
  if ((navigator.userAgent.toLowerCase()).includes("kaios")){
    document.body.requestFullscreen();
    if (video.videoWidth >= video.videoHeight){
      screen.orientation.lock('landscape-primary')
    } else {
      screen.orientation.lock('portrait-primary')
    }
  }
}


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

video.ontimeupdate = (e) => {
  var progress = (e.target.currentTime / e.target.duration) * 100;
//  document.getElementById('video_progress').style.width = `${progress}%`;
//  document.getElementById('current-duration').innerHTML = convertTime(e.target.currentTime);
//  document.getElementById('total-duration').innerHTML = convertTime(e.target.duration);
//  RESUME_LOGS[id] = e.target.currentTime
//  localforage.setItem('RESUME_LOGS', RESUME_LOGS);
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
  
  if (option.name === "pris@open") {
    if (activityReq.source.data.blobs[0]){
      video.querySelector("source").src = URL.createObjectURL(activityReq.source.data.blobs[0]);
      video.querySelector("source").type = activityReq.source.data.blobs[0].type
      video.load()
      setTimeout(lud,1000)
      setTimeout(()=>{video.play()},800)
    }
    if (activityReq.source.data.sub[0]){
      var reader = new FileReader();
      reader.readAsText(activityReq.source.data.sub[0]);
      reader.onload = () => {
        const _vtt = srt2webvtt(reader.result);
        console.log(_vtt)
        var _vttBlob = new Blob([_vtt], {type: "text/vtt"});  
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