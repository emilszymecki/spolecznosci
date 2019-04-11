var observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
	$(entry.target).hide().fadeIn(6000)
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
    rootMargin: '100px 0px'
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
