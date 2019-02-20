var temp = 'MAIN'

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};



$(document).on('mousemove', debounce(e => {
   if(e.target.nodeName === "MAIN"){
        temp = "MAIN"
    }else{
        temp = "INNY"
    }
    console.log(e.target.nodeName,temp)
},500))


$(document).on('click', e => {
    if(temp === "MAIN"){
        console.log("kliknięty ok")
    }
    else{
        console.log("przypadek")
    }
})
