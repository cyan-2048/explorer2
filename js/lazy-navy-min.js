/* 

  hai welcome to my unreleased spatial naviboard implementation... i made it since z doesn't like it when i use other people's js library or maybe even just libraries jk lol idk
  not minified yet coz not yet ready

*/

const navlzy = {
  fcsbl: null,
  bv: "nearest",
  jmp: true,
  lstnr: "keydown",
  prv: true,
  scrl: "auto",
  prblmtc: /INPUT|TEXTAREA/g,
  prvnt: ["Space","ArrowUp","ArrowDown"]
}


const evlazy = (e)=>{
if (document.querySelectorAll(navlzy.fcsbl).length !== 0 ){ 
  var currentIndex = document.activeElement.tabIndex;
  var fcsbl = document.querySelectorAll(navlzy.fcsbl);
  var prblmtc = navlzy.prblmtc;
  switch (e.key) {
    case "ArrowDown":
      if (navlzy.bv == "nearest" && navlzy.scrl == "smooth"){
        if (currentIndex !== fcsbl.length - 1){
          if (isInViewport(fcsbl[currentIndex + 1])){
            fcsbl[currentIndex + 1].focus()
          } else {
            var idkk = setInterval(() => {
              if (fcsbl[currentIndex + 1].tagName.match(prblmtc)){
                if (isInViewport(fcsbl[currentIndex + 1].parentElement)){
                  fcsbl[currentIndex + 1].focus()
                  clearInterval(idkk)
                }
              } else {
                if (isInViewport(fcsbl[currentIndex + 1])){
                  fcsbl[currentIndex + 1].focus()
                  clearInterval(idkk)
                }
              }
              
            }, 100);
            if (currentIndex + 1 == fcsbl.length - 1){
              fcsbl[currentIndex + 1].scrollIntoView({block:"start",behavior:"smooth"})
            } else if (fcsbl[currentIndex + 1].tagName.match(prblmtc)){
              fcsbl[currentIndex + 1].parentElement.scrollIntoView({block:"end",behavior:"smooth"})
            } else {
              fcsbl[currentIndex + 1].scrollIntoView({block:"end",behavior:"smooth"})
            }
          } 
        } else if (navlzy.jmp == true){
          fcsbl[0].scrollIntoView({block:"start",behavior:"smooth"})
          var idkk = setInterval(() => {
            if (fcsbl[0].tagName.match(prblmtc)){
              if (isInViewport(fcsbl[0].parentElement)){
                fcsbl[0].focus()
                clearInterval(idkk)
              }
            } else {
              if (isInViewport(fcsbl[0])){
                fcsbl[0].focus()
                clearInterval(idkk)
              }
            }
            
          }, 100)


        }
      } else if (navlzy.bv == "nearest" && navlzy.scrl == "auto"){
        if (currentIndex !== fcsbl.length - 1){
          if (isInViewport(fcsbl[currentIndex + 1])){
            if (currentIndex + 1 == fcsbl.length - 1){
              fcsbl[currentIndex + 1].scrollIntoView({block:"start"})
              fcsbl[currentIndex + 1].focus()
            } else {
              fcsbl[currentIndex + 1].focus()
            }
          } else {
            fcsbl[currentIndex + 1].focus()
            if (currentIndex + 1 == fcsbl.length - 1){
              fcsbl[currentIndex + 1].scrollIntoView({block:"start"})
            } else if (fcsbl[currentIndex + 1].tagName.match(prblmtc)){
              fcsbl[currentIndex + 1].parentElement.scrollIntoView({block:"end"})
            } else {
              fcsbl[currentIndex + 1].scrollIntoView({block:"end"})
            }
          }
        } else if (navlzy.jmp == true){
          fcsbl[0].scrollIntoView({block:"end"})
          fcsbl[0].focus()
        }
      } else if (navlzy.bv == "center"){
        if (currentIndex !== fcsbl.length - 1){
          fcsbl[currentIndex + 1].focus()
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
        } else if (navlzy.jmp == true){
          fcsbl[0].scrollIntoView({block:"end",behavior:navlzy.scrl})
          var idkk = setInterval(() => {
            if (fcsbl[0].tagName.match(prblmtc)){
              if (isInViewport(fcsbl[0].parentElement)){
                fcsbl[0].focus()
                clearInterval(idkk)
              }
            } else {
              if (isInViewport(fcsbl[0])){
                fcsbl[0].focus()
                clearInterval(idkk)
              }
            }
            
          }, 100)


        }
      }
      break;
    case "ArrowUp":
      if (navlzy.bv == "nearest" && navlzy.scrl == "smooth"){
        if (currentIndex !== 0){
          if (isInViewport(fcsbl[currentIndex - 1])){
            fcsbl[currentIndex - 1].focus()
          } else {
            var idkk = setInterval(() => {
              if (fcsbl[currentIndex - 1].tagName.match(prblmtc)){
                if (isInViewport(fcsbl[currentIndex - 1].parentElement)){
                  fcsbl[currentIndex - 1].focus()
                  clearInterval(idkk)
                }
              } else {
                if (isInViewport(fcsbl[currentIndex - 1])){
                  fcsbl[currentIndex - 1].focus()
                  clearInterval(idkk)
                }
              }
            }, 100);
            if (fcsbl[currentIndex - 1].tagName.match(prblmtc)){
              fcsbl[currentIndex - 1].parentElement.scrollIntoView({block:"start",behavior:"smooth"})
            } else {
              fcsbl[currentIndex - 1].scrollIntoView({block:"start",behavior:"smooth"})
            }
          } 
        } else if (navlzy.jmp == true){
          fcsbl[fcsbl.length - 1].scrollIntoView({block:"start",behavior:"smooth"})
          var idkk = setInterval(() => {
            if (fcsbl[fcsbl.length - 1].tagName.match(prblmtc)){
              if (isInViewport(fcsbl[fcsbl.length - 1].parentElement)){
                fcsbl[fcsbl.length - 1].focus()
                clearInterval(idkk)
              }
            } else {
              if (isInViewport(fcsbl[fcsbl.length - 1])){
                fcsbl[fcsbl.length - 1].focus()
                clearInterval(idkk)
              }
            }
            
          }, 100)


        }

      } else if (navlzy.bv == "nearest" && navlzy.scrl == "auto"){
        if (currentIndex !== 0){
          if (isInViewport(fcsbl[currentIndex - 1])){
            fcsbl[currentIndex - 1].focus()
          } else {
            fcsbl[currentIndex - 1].focus()
            if (currentIndex - 1 == 0){
              fcsbl[currentIndex - 1].scrollIntoView({block:"end"})
            } else if (fcsbl[currentIndex - 1].tagName.match(prblmtc)){
              fcsbl[currentIndex - 1].parentElement.scrollIntoView({block:"start"})
            } else {
              fcsbl[currentIndex - 1].scrollIntoView({block:"start"})
            }
          }
        } else if (navlzy.jmp == true){
          fcsbl[fcsbl.length - 1].scrollIntoView({block:"start"})
          fcsbl[fcsbl.length - 1].focus()
        }
      } else if (navlzy.bv == "center"){
        if (currentIndex !== 0){
          fcsbl[currentIndex - 1].focus()
          setTimeout(()=>{
            const rect = document.activeElement.getBoundingClientRect();
            const elY =
              rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
            document.activeElement.parentElement.parentNode.parentElement.scrollBy({
              left: 0,
              top: elY - window.innerHeight / 2,
              behavior: navlzy.scrl,
            });
            document.activeElement.parentNode.scrollBy({
              left: 0,
              top: elY - window.innerHeight / 2,
              behavior: navlzy.scrl,
            });
          }, 50);
        } else if (navlzy.jmp === true){
          fcsbl[fcsbl.length - 1].scrollIntoView({block:"start",behavior:navlzy.scrl})
          var idkk = setInterval(() => {
            if (fcsbl[fcsbl.length - 1].tagName.match(prblmtc)){
              if (isInViewport(fcsbl[fcsbl.length - 1].parentElement)){
                fcsbl[fcsbl.length - 1].focus()
                clearInterval(idkk)
              }
            } else {
              if (isInViewport(fcsbl[fcsbl.length - 1])){
                fcsbl[fcsbl.length - 1].focus()
                clearInterval(idkk)
              }
            }
            
          }, 100)


        }
      }
      break;
    case "ArrowLeft":
      console.log("left")
      break;
    case "ArrowRight":
      console.log("right")
      break;
  
  }
}
}

const isInViewport = (element)=>{
  const bounding = element.getBoundingClientRect();
  return (bounding.top >= 0 + 20 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight - 0 - 20);
}



window.addEventListener(navlzy.lstnr,evlazy)

const lazyNAV = (a) => {
  window.removeEventListener(navlzy.lstnr,evlazy)
  Object.assign(navlzy, a)
  if (navlzy){
    for (let i = 0; i < document.querySelectorAll(navlzy.fcsbl).length; i++) {
      document.querySelectorAll(navlzy.fcsbl)[i].tabIndex = [i]
    }
  }
  window.addEventListener(navlzy.lstnr,evlazy)
}

window.addEventListener("keydown", (e)=>{
if (navlzy.prv === true){
  if(navlzy.prvnt.indexOf(e.code) > -1) {
        e.preventDefault();
    }
  }
})

