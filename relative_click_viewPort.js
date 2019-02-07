$(document).click(e => console.log(e.pageY,$(document).height(),`${Math.round(e.pageY * 100 / $(document).height() )}%` ))
