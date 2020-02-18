var createIframe = () => {
    console.log("Run");
    var createIframe = window.createIframe;
    var coreCreate = (elGen,domain,int) => {
    var createEl = document.createElement('iframe');
    var createScriptInit = document.createElement('script');
    createScriptInit.innerHTML = `
         var createIframe = ${createIframe};
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
        setInterval(() => {
            console.log("check");
            [...document.querySelectorAll('div[class="spolecznoscinet"]')].forEach(x => {
                if(x.innerHTML.length < 100){
                     window["_qasp"] = [];
                    _qasp.push('go');
                    _qasp.push(['setFastPAID', 'sadConamiescie']);
                    initAds(document, 'script', '//s.spolecznosci.net/js/core2-min.js');
                }
            })
        },5000);
    `;
    createEl.src = 'about:blank';
    createEl.id = int;
    document.body.appendChild(createEl);  
   	createEl.contentDocument.write(elGen)
    createEl.contentDocument.body.appendChild(createScriptInit);
    };

    var domain = window.location.hostname.replace("www.","").split(".").slice(0,-1).join("").split("").map((x,i) => i==0?x.toUpperCase():x).join("");
    [...document.querySelectorAll('div[class="spolecznoscinet"]')].forEach((x,i) => {
         console.log(x);
    	 coreCreate(`<div class="spolecznoscinet" id=${x.id}></div>`,domain,"el"+i);
	});
   
}
