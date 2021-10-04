/**
* Explorer for FirefoxOS v0.1
*
* Copyright Sebastián Rajo 2013.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*
* References:
* 
* - https://wiki.mozilla.org/WebAPI/DeviceStorageAPI
*/

  ringtone = ['mp3','oog'];
  opsyon = false;
  isPicking = false;
  isSharing = false;
  SaR = false;
  activityRequest = "";
  anim = 2;

    SDCARD = "sdcard";
    filesToImport = [];
    folders = [];
    root = "";
    isBacking = false;
    foldersAdded = [];
    lastIndex = new Object;

    window.addEventListener("keydown",(e)=>{
      switch (e.key) {
        case "Backspace":
          anim = 0
          
          if (document.activeElement.hasAttribute("meth")){
            lastIndex["/"+root] = document.activeElement.tabIndex
          }
          if (root !== ""){
            e.preventDefault();
            for (let p = 0; p < document.querySelectorAll(".lista div[meth]").length; p++) {
              document.querySelectorAll(".lista div[meth]")[p].classList.add("anim4");
            }
            setTimeout(()=>{
              back();
            },300)
            
          }
          if (document.activeElement.className == "oops"){
            e.preventDefault();
            goAwayPls()
          }
          break;
        case "Enter":
          anim = 1;
          if (document.activeElement.parentElement.id == "item-list"){
            
            if (JSON.parse(document.activeElement.getAttribute("meth")).folder == true){
              for (let p = 0; p < document.querySelectorAll(".lista div[meth]").length; p++) {
                document.querySelectorAll(".lista div[meth]")[p].classList.add("anim3");
              }
              setTimeout(()=>{
                selecta()
              },300)
            } else {
              selecta()
            }
            lastIndex["/"+root] = document.activeElement.tabIndex
          }

           if (document.activeElement.className == "oops"){
            console.log("clicked")
            var b = Number(document.activeElement.getAttribute("num"))
            
            switch (b) {
              case 1:
                document.getElementById("deviceStoragesList").focus()
                break;
              case 2:
                isSharing = true
                importFiles(selsected)
                break;
              case 3:
                
                break;
              case 4:
                
                break;
              case 5:
                goAwayPls()
                setTimeout(() => {
                  anim = 2
                  for (let p = 0; p < document.querySelectorAll(".lista div[meth]").length; p++) {
                    document.querySelectorAll(".lista div[meth]")[p].classList.add("anim5");
                  }
                  setTimeout(()=>{
                    load()
                  },300)
                }, 500);
                break;
              case 6:
                
                break;
              case 7:
                
                break;
              case 8:
                
                break;
              case 9:
                
                break;
              case 10:
                SaR = true
                importFiles(selsected)
                break;
            }
          }
          


          break;
        case "SoftLeft":
          anim = 2
          for (let p = 0; p < document.querySelectorAll(".lista div[meth]").length; p++) {
            document.querySelectorAll(".lista div[meth]")[p].classList.add("anim5");
          }
          setTimeout(()=>{
            load()
          },300)
          if (document.activeElement.hasAttribute("meth")){
          lastIndex["/"+root] = document.activeElement.tabIndex
        }
          break;
        case "SoftRight":
          if (document.activeElement.parentElement.id == "item-list"){
          opsyon = true
          lastIndexu = document.activeElement;
          document.querySelector("footer").classList.add("negro");
          selsected = JSON.parse(document.activeElement.getAttribute("meth"))
          if (selsected.folder == true){
            document.getElementById("shr").className = ""
          } else {
            document.getElementById("shr").className = "oops"
          }
          if (ringtone.indexOf(selsected.ext) == -1){
            document.getElementById("sar").className = ""
          } else {
            document.getElementById("sar").className = "oops"
          }
          document.getElementById("upsyun").style.display = "block";
          lazyNAV({fcsbl:'.oops',bv:"nearest",scrl:"auto"});
          document.querySelector(".oops").focus()
        }
          break;
      }
    })



    // Open the default device storage
    storage = navigator.getDeviceStorage(SDCARD);
    storages = [];
    
    deviceStoragesList = document.querySelector("#deviceStoragesList");
    // Check that getDeviceStorages is available (only for FxOS >=1.1)
    if (navigator.getDeviceStorages) {
        storages = navigator.getDeviceStorages(SDCARD);
        if (storages.length > 1) {
            // Display the dropdown list only if there are more than one device storage available
            deviceStoragesList.style.display = "inline-block";
            for (var i = 0; i < storages.length; i++) {
                var storageName = storages[i].storageName;
                deviceStoragesList.options[i] = new Option(storageName, storageName);
                if (storages[i].default === true) {
                        deviceStoragesList.options[i].selected = true;
                }
            }
        }
        deviceStoragesList.addEventListener("change", function() {
          anim = 2
          setTimeout(() => {
            changeDeviceStorage(this.options[this.selectedIndex].value);
          }, 50); 
        });
    }
   

    function goAwayPls(){
      if (opsyon == true){
        opsyon = false;
        document.getElementById("upsyun").className = "anim6"
        lazyNAV({fcsbl:".lista div[meth]",bv:"center",scrl:"smooth"})
        document.querySelector("footer").classList.remove("negro")
        setTimeout(() => {
          
          document.getElementById("upsyun").style.display = "none"
          document.getElementById("upsyun").className = ""
          lastIndexu.focus()
        }, 500);
      }
      
    }

    const back = ()=>{
      isBacking = true;
      folders = root.split("/");
      folders.splice(folders.length - 1, 1)
      root = folders.join("/");
      load();
    }
    
    /**
     * Switches to another device storage, based on the given name
     * @param {String} deviceStorageName Name of the device storage to switch to
     */
    const changeDeviceStorage=(deviceStorageName)=> {
        for (var i=0; i< storages.length; i++) {
            if (deviceStorageName === storages[i].storageName) {
                storage = storages[i];
                // Go back to the root of the device storage, and load its content
                root = "";
                load();
                return;
            }
        }
    }

    rootslow = false
    cachedPaths = new Object();
    cachedFiles = new Object();

    const load = ()=>{
      goAwayPls();
      foldersToSort = [];
      filesToSort = [];
      pathsToSort = [];
      sizes = [];

      alreadyAdded = [];
      
      if (root.replace(/\//g, ' > ').length > 25){
        document.querySelector("#path_root").innerHTML = '<label><span class="home"></span></label>' +"<div>"+ "..." + root.replace(/\//g, ' > ').substr(root.replace(/\//g, ' > ').length - 25) +"</div>";
      } else {
        document.querySelector("#path_root").innerHTML = '<label><span class="home"></span></label>' +"<div>"+ root.replace(/\//g, ' > ') +"</div>";
      }

      

      document.getElementById("item-list").innerHTML = ""
      loadinganim = setTimeout(()=>{
        document.getElementById("item-list").innerHTML = '<div style="position: fixed; top: 31%; left: 39%; transform: scale(0.9);" class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div><div style="width: 100%; text-align: center; position: relative; top: 120px; font-size: 15px; font-weight: 400;">Just a moment...</div>'
        rootslow = true
      },2000)
      var cursor = storage.enumerate(root);

      cursor.onsuccess = function() {
      if (cachedPaths["/"+root] && cachedFiles["/"+root]){
        clearTimeout(loadinganim);
        rootslow = false
        pathsToSort = cachedPaths["/"+root]
        filesToSort = cachedFiles["/"+root]
        document.getElementById("item-list").innerHTML = "";
          execute();
          lazyNAV({fcsbl:".lista div[meth]",bv:"center",scrl:"smooth"})
          if (!lastIndex["/"+root] || lastIndex["/"+root] < 0){
            lastIndex["/"+root] = 0
          }
          document.querySelectorAll(".lista div[meth]")[lastIndex["/"+root]].focus()
          setTimeout(()=>{
            const rect = document.activeElement.getBoundingClientRect();
            const elY =
              rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
            
            document.activeElement.parentNode.scrollBy({
              left: 0,
              top: elY - window.innerHeight / 2,
              behavior: "auto",
            });
          }, 5)

          setTimeout(() => {
            for (let p = 0; p < document.querySelectorAll(".lista div[meth]").length; p++) {
              document.querySelectorAll(".lista div[meth]")[p].classList.add("anim"+anim);
            }
          }, 50);
          
          
          return;
      } else {
        if (!cursor.result) {
          clearTimeout(loadinganim);
          if (rootslow){
            cachedPaths["/"+root] = pathsToSort
            cachedFiles["/"+root] = filesToSort
            rootslow = false
          }
          document.getElementById("item-list").innerHTML = "";
          execute();
          lazyNAV({fcsbl:".lista div[meth]",bv:"center",scrl:"smooth"})
          if (!lastIndex["/"+root] || lastIndex["/"+root] < 0){
            lastIndex["/"+root] = 0
          }
          document.querySelectorAll(".lista div[meth]")[lastIndex["/"+root]].focus()
          setTimeout(()=>{
            const rect = document.activeElement.getBoundingClientRect();
            const elY =
              rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
            
            document.activeElement.parentNode.scrollBy({
              left: 0,
              top: elY - window.innerHeight / 2,
              behavior: "auto",
            });
          }, 5)

          setTimeout(() => {
            for (let p = 0; p < document.querySelectorAll(".lista div[meth]").length; p++) {
              document.querySelectorAll(".lista div[meth]")[p].classList.add("anim"+anim);
            }
          }, 50);
          
          
          return;
        }

        var file = cursor.result;
        var prefix = "/" + storage.storageName + "/";
        if (root != "") {
           prefix += root + "/";
        }
        var fname = file.name.replace(prefix, "");
        if(fname.split("/").length > 1) {
          pathsToSort.push({"fname":fname , "lastModified": file.lastModifiedDate.toLocaleString("en-GB")});
        } else {
          filesToSort.push({"fname":fname , "fz":file.size, "ext": fname.split(".")[fname.split(".").length - 1], "lastModified": file.lastModifiedDate.toLocaleString("en-GB") });
        }
        cursor.continue();
      }
      }

      function execute() {
        var input = []
        filesWithImage = ['doc', 'xls', 'ppt', 'psd', 'ai', 'pdf', 'html', 'xml', 'txt', 'mp3', 'jpg', 'png', 'zip', 'ogg'];

        pathsToSort.sort(
          function(a, b) {
            if (a["fname"].toLowerCase() < b["fname"].toLowerCase()) return -1;
            if (a["fname"].toLowerCase() > b["fname"].toLowerCase()) return 1;
            return 0;
          }
          );
        filesToSort.sort(
          function(a, b) {
            if (a["fname"].toLowerCase() < b["fname"].toLowerCase()) return -1;
            if (a["fname"].toLowerCase() > b["fname"].toLowerCase()) return 1;
            return 0;
          }
          );

        for (var s = 0; s < pathsToSort.length; s++) {
          var n = pathsToSort[s].fname.split("/");
          if(n.length == 1) {
            filesToSort.push(n[0]);
          } else {
            var a = [...pathsToSort]
            a.fname = n[0];
            foldersToSort.push(a);
          }
        }

        for (var g = 0; g < foldersToSort.length; g++) {
          path = foldersToSort[0][g].fname.split("/");

          if(alreadyAdded.lastIndexOf(path[0] + "/") == -1) {
            alreadyAdded.push(path[0] + "/");
          //  input.push('<li meth=\'{"fname":"'+path[0].toString()+'","lastModified":"'+foldersToSort[0][g].lastModified+'","folder":true}\'><label><input type="checkbox"><span class="folder"></span>'
          //  + '</label>' + path[0] + '</li>')

            input.push('<div class="list-item-icon" meth=\''+JSON.stringify({"fname":path[0].replace(/'/g, "’"),"lastModified":foldersToSort[0][g].lastModified,"folder":true})+'\'><img src="css/images/folder.svg" alt="" class="list-item-icon__icon"><div class="list-item-icon__text-container"><p class="list-item-icon__text">' + path[0] + '</p><p class="list-item-icon__subtext">'+foldersToSort[0][g].lastModified.split(",")[0].split("/").join("-")+'</p></div></div>')

          }
        }
        for (var f = 0; f < filesToSort.length; f++) {
          path = filesToSort[f];
          fileType = path["ext"];
          if(filesWithImage.indexOf(fileType) == -1){
            fileType = 'unk';
          }
          
        //  input.push('<li meth=\''+JSON.stringify(path)+'\'><label><input type="checkbox"><span class="' + fileType + '"></span>'
        //  + '</label>' + path["fname"] + '</li>')

          input.push('<div class="list-item-icon" meth=\''+JSON.stringify(path)+'\'><img src="css/images/'+fileType+'.png" alt="" class="list-item-icon__icon"><div class="list-item-icon__text-container"><p class="list-item-icon__text">' + path["fname"] + '</p><p class="list-item-icon__subtext">' + path["lastModified"].split(",")[0].split("/").join("-") + '</p><p class="list-item-icon__subtext bwa">'+niceBytes(path["fz"])+'</p></div></div>')

        }
        
        document.querySelector("#item-list").innerHTML = input.join("")
        
        /*
        document.activeElement.insertAdjacentHTML("afterend",'<div id="opsyons" style = "height:192px"><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div class="poppies">CONCEPT</div><div>')
document.activeElement.scrollIntoView({block:"start",behavior:"smooth"})

document.getElementById("opsyons").remove()
setTimeout(()=>{
            const rect = document.activeElement.getBoundingClientRect();
            const elY =
              rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
            
            document.activeElement.parentNode.scrollBy({
              left: 0,
              top: elY - window.innerHeight / 2,
              behavior: navlzy.scrl,
            });
          }, 50);


          I'm starting to give up on animations at this point
*/
        

        

        
      };
      isBacking = false;
    }

    
   
    function niceBytes(x){
    
      var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let l = 0, n = parseInt(x, 10) || 0;
    
      while(n >= 1024 && ++l){
          n = n/1024;
      }
      
      return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    }

    load();

    function selecta() {
      var target = JSON.parse(document.activeElement.getAttribute("meth").replace(/’/g, "'"));
      if(target.fname != ""){
        if(target.folder == true){
          if(!isBacking){
            if(root == ""){
              root = target["fname"];
            } else {
              root = root + "/" + target["fname"];
            }
          }
          load();
        } else {
          console.log("File to share: " + target["fname"]);
          importFiles(target);
        }
      }
    }

    const importFiles = (filesToImport)=> {
      var vidz = ['mp4','3gp']
      
      if (vidz.indexOf(filesToImport.ext) != -1){
        subfind = (root == "") ? storage.get(filesToImport.fname.split("." + filesToImport.ext)[0] + ".srt") : subfind = storage.get(root + "/" + filesToImport.fname.split("." + filesToImport.ext)[0] + ".srt")
        subfind1 = (root == "") ? storage.get(filesToImport.fname.split("." + filesToImport.ext)[0] + ".vtt") : subfind1 = storage.get(root + "/" + filesToImport.fname.split("." + filesToImport.ext)[0] + ".vtt")
        
        sub0 = ""
        sub1 = ""
        
        subfind.onerror = ()=>{
          sub0 = ""
          // sub = new Blob(["WEBVTT\n\n1\n00:00:00 --> 00:00:01\n \n\n"], {type: "text/vtt"})
          brokensubs()
        }
        subfind1.onerror = ()=>{
          sub1 = ""
          //  sub1 = new Blob(["WEBVTT\n\n1\n00:00:00 --> 00:00:01\n \n\n"], {type: "text/vtt"})
          brokensubs()
        }
  
        subfind.onsuccess = ()=>{
          
          sub0 = subfind.result
          brokensubs()
        }
        subfind1.onsuccess = ()=>{
          
          sub1 = subfind1.result
          brokensubs()
        }
      }
      

      a_file = (root == "") ? storage.get(filesToImport.fname) : a_file = storage.get(root + "/" + filesToImport.fname);

      a_file.onerror = function() {
        var afterNotification = function(){
          Lungo.Router.section("main");
          load();
        };
        Lungo.Notification.error(
          "Sorry!",
          "We can't find a file in your SDCARD (or you have to unplug your phone).",
          "warning",
          5,
          afterNotification
          );
        console.error("Error in: ", a_file.error.name);
      };

      
      

      a_file.onsuccess = function() {


      

        if(isPicking){
          isPicking = false;
          activityRequest.postResult.type = a_file.result.type;
          activityRequest.postResult({
            type: a_file.result.type,
            blob: a_file.result
          });
        } else if (isSharing) {
          isSharing = false;
          blob = a_file.result;
          item = new Object();
          item.isVideo = true;
          item.filename = blob.name;
          item.blob = blob;
          var type = blob.type;
          var nameonly = item.filename.substring(item.filename.lastIndexOf('/') + 1);
          var activity = new MozActivity({
            name: 'share',
            data: {
              // this is ugly; all share options with images are shown. But right now is the
              // only way to share with the email.
              type: 'image/*',
              number: 1,
              blobs: [item.blob],
              filenames: [nameonly],
              filepaths: [item.filename]
            }
          });

          activity.onerror = function(e) {
            console.warn('Share activity error:', activity.error.name);
            load();
          };

          activity.onsuccess = function(e) {
            load();
          }
        } else if (ringtone.indexOf(filesToImport.ext) != -1 && SaR){
          SaR = false
          var item = new Object();
          item.filename = a_file.result.name;
          item.blob = a_file.result;
          var nameonly = item.filename.substring(item.filename.lastIndexOf('/') + 1);
          var activity = new MozActivity({
            name: 'setringtone',
            data: {
              type: 'audio/*',
              number: 1,
              blobs: [item.blob],
              filenames: [nameonly],
              filepaths: [item.filename]
            }
          });

          activity.onerror = function(e) {
            console.warn('Share activity error:', activity.error.name);
            load();
          };

          activity.onsuccess = function(e) {
            load();
          }
        } else if (vidz.indexOf(filesToImport.ext) != -1){
          brokensubs()
          var item = new Object();
          item.filename = a_file.result.name;
          item.blob = a_file.result;
          var type = a_file.result.type;
          
          var nameonly = item.filename.substring(item.filename.lastIndexOf('/') + 1);
          var activity = new MozActivity({
            name: 'open',
            data: {
              type: type,
              number: 1,
              blob: item.blob,
              filenames: [nameonly],
              filepaths: [item.filename],
              sub: sub
            }
          });

          activity.onsuccess = (data) => {
            console.log(activity.result)
          }
          activity.onerror = function(e) {
            console.warn('Share activity error:', activity.error.name);
            load();
          };

        }
      };
    }

    function brokensubs(){
      if (sub1 !== ""){
        sub = sub1
      } else if (sub0 !== ""){
        sub = sub0
      } else if (sub0 == "" || sub1 == "") {
        sub = new Blob(["WEBVTT\n\n1\n00:00:00 --> 00:00:01\n \n\n"], {type: "text/vtt"})
      }
    }

    document.getElementById("deviceStoragesList").addEventListener("blur",()=>{
      document.querySelector(".oops").focus()
    })

  navigator.mozSetMessageHandler('activity', function(activityReq) {
    activityRequest = activityReq;
    var option = activityRequest.source;

    if (option.name === "pick") {
      isPicking = true;
    }
  });



