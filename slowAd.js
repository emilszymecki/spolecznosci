var changeOverflow = () => {
	var actual = document.body.style.overflow
	if(actual == "" || actual == "visible"){
		document.body.style.overflow = "hidden"
	}
	if(actual == "hidden"){
		document.body.style.overflow = "visible"
	}
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var controlObj = {}

function callback(entries, observer) {
    entries.forEach(entry => {
        const isAbove = entry.boundingClientRect.y < entry.rootBounds.y;
        if(controlObj[entry.target.id] == undefined){
            controlObj[entry.target.id] = {start:0,isAbove:false,isAboveStart:isAbove,isVisibleOnStart:entry.isIntersecting,unmount:false}
        }else{
            controlObj[entry.target.id].start += 1
            controlObj[entry.target.id].isAbove = isAbove
        }
        if(controlObj[entry.target.id].unmount){
            observer.unobserve(entry.target);
        }
        if(entry.intersectionRatio == 0 && controlObj[entry.target.id].isAbove){
            controlObj[entry.target.id].unmount = true;
        }
        if( entry.isIntersecting && entry.intersectionRatio > 0.3 && controlObj[entry.target.id].isAbove){
            console.log(entry.isIntersecting,entry.intersectionRatio.toFixed(2) * 100,controlObj[entry.target.id].isAbove)
            changeOverflow();
            delay(entry.intersectionRatio.toFixed(2) * 100).then(changeOverflow)
        }
        console.log(entry,controlObj[entry.target.id],entry.boundingClientRect.y)
    });
}
var intersectionObserver = new IntersectionObserver(callback,{threshold:[...Array.from(new Array(100), (x,i) => i/100),1],rootMargin: '-60px 0px 0px 0px'});

document.querySelectorAll("div[id^='spolecznosci']").forEach(x => intersectionObserver.observe(x))
