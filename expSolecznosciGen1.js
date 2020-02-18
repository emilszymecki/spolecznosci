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
                if(x.innerHTML.length < 300 || x.innerHTML.includes("2386558369721555") || x.innerHTML.includes("2365165112249593") || x.innerHTML.includes("google_ads_iframe_/134168336/")){
                     window["_qasp"] = [];
                    _qasp.push('go');
                    _qasp.push(['setFastPAID', 'sad${domain}']);
                    initAds(document, 'script', '//s.spolecznosci.net/js/core2-min.js');
                }else{
                    window["_qasp"] = [];
                    x.innerHTML = "";
                    createIframe();
                }
            })
        },15000);
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
