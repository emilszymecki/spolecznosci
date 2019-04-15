var fadeIn = function (el) {
    el.style.opacity = 0;
    var i = 0;
    var tick = function () {
        i += 0.03;
        el.style.opacity = i;
        if (el.style.opacity < 1) setTimeout(tick, 3000/25);
        else el.style.opacity = 1;
    };
    tick();
};

var observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
	//$(entry.target).hide().fadeIn(6000)
	fadeIn(entry.target)
	//loa.fadeIn(entry.target[0], 500, 'block', function() { console.log('done'); });
  	var id = entry.target.id
  	var idnbr = parseInt(id.split("-")[1])
    if (entry.intersectionRatio > 0) {
      console.log('in the view',entry);
      _qasp.push(['sadInit', ['sadKwejk', idnbr]]);
      observer.unobserve(entry.target);
    } else {
      console.log('out of view');
    }
  });
},{
    rootMargin: '50px 0px'
});


function getSiblings(el, filter) {
    var siblings = [];
    el = el.parentNode.firstChild;
    do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
    return siblings;
}

var el = document.querySelector('body');

var sibs = getSiblings(el,(el) => el.nodeName.toLowerCase() == 'iframe');

sibs.forEach(elem => elem.parentNode.removeChild(elem))

var myImgs = document.querySelectorAll('.spolecznoscinet');


myImgs.forEach(image => {
  var idnbr =  parseInt(image.id.split("-")[1])
  _qasp.push(['disable', idnbr]);
  _qasp.push(['enable', idnbr]);
  observer.observe(image);
});
