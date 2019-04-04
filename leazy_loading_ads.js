const myImgs = document.querySelectorAll('.spolecznoscinet');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
  	const id = entry.target.id
  	const idnbr = parseInt(id.split("-")[1])
  	 _qasp.push(['enable', idnbr]);
    if (entry.intersectionRatio > 0) {
      console.log('in the view',entry);
      observer.unobserve(entry.target);
      //_qasp.push(['enable', idnbr]);
      _qasp.push(['sadInit', ['sadKwejk', idnbr]]);
    } else {
      console.log('out of view');
    }
  });
},{
    rootMargin: '1000px 0px'
});

myImgs.forEach(image => {
  const idnbr =  parseInt(image.id.split("-")[1])
  _qasp.push(['disable', idnbr]);
  observer.observe(image);
});
