$(document).click(e => console.log(e.pageY,$(document).height(),`${Math.round(e.pageY * 100 / $(document).height() )}%` ))
//Vanilla
document.addEventListener("click", e => console.log(e.pageY,document.body.scrollHeight,`${Math.round(e.pageY*100/document.body.scrollHeight)}%`))
