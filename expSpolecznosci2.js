var coreCreate = (elGen,domain) => {
    var createEl = document.createElement('iframe');
    var createScriptInit = document.createElement('script');
    createScriptInit.innerHTML = `
         var _qasp = _qasp || [];
         var initAds = (d, x, a)  => {
            var z = d.createElement(x);
            z.type = 'text/javascript';
            z.src = a;
            var s = d.getElementsByTagName(x)[0];
            s.parentNode.insertBefore(z, s);
         }
        _qasp.push('go');
        _qasp.push(['setFastPAID','sad${domain}']);
        initAds(document, 'script', '//s.spolecznosci.net/js/core2-min.js');
    `;
    createEl.src = 'about:blank';
    document.body.appendChild(createEl);  
   	createEl.contentDocument.write(elGen)
    createEl.contentDocument.body.appendChild(createScriptInit);
};

var createIframe = () => {
    console.log("Run")
    var domain = window.location.hostname.replace("www.","").split(".").slice(0,-1).join("").split("").map((x,i) => i==0?x.toUpperCase():x).join("");
    [...document.querySelectorAll('div[class="spolecznoscinet"]')].forEach(x => {
    	 coreCreate(`<div class="spolecznoscinet" id=${x.id}></div>`,domain)
	});
   
}
