var createIframe = () => {
    console.log("Run");
    var createIframe = window.createIframe;
    var coreCreate = (el,domain,int) => {
    console.log(el,domain,int);
    var elGen = `<div class="spolecznoscinet" id=${el.id}></div>`;
    var createEl = document.createElement('iframe');
    //createEl.scrolling="no" marginheight="0" marginwidth="0" width="970" height="250" style="overflow: hidden; border: none;" id="sas_1582023859001rnd"></iframe>
    createEl.onload = setInterval(() => {
        createEl.setAttribute("height",createEl.contentDocument.documentElement.scrollHeight);
        createEl.setAttribute("width",createEl.contentDocument.documentElement.scrollWidth);
    },500);
    createEl.setAttribute("scrolling", "no");
    createEl.setAttribute("marginheight", "0");
    createEl.setAttribute("marginwidth", "0");
    createEl.style["overflow"] = "hidden";
    createEl.style["border"] = "none";
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
                if(x.innerHTML.length < 100 || x.innerHTML.includes("google_ads_frame")){
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
    el.innerHTML = "";
    el.style[" overflow"] = "hidden";
    el.parentNode.replaceChild(createEl, el); 
   	createEl.contentDocument.write(elGen);
    createEl.contentDocument.body.appendChild(createScriptInit);
    };

    var domain = window.location.hostname.replace("www.","").split(".").slice(0,-1).join("").split("").map((x,i) => i==0?x.toUpperCase():x).join("");
    [...document.querySelectorAll('div[class="spolecznoscinet"]')].forEach((x,i) => {
         console.log(x);
    	 coreCreate(x,domain,"el"+i);
	});
   
}
