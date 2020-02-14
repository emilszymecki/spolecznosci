function someFunction(){
    var _qasp = _qasp || [];
    _qasp.push('go');
    _qasp.push(['setFastPAID','sadFronda']);
}

var createIframe = function(){
    var createEl = document.createElement('iframe');
    var createScript = document.createElement('script');
    var createScriptInit = document.createElement('script');

    createScript.innerHTML = `
        (function (d, x, a) {
        var z = d.createElement(x); z.type = 'text/javascript'; z.src = a; var s = d.getElementsByTagName(x)[0]; s.parentNode.insertBefore(z, s);
    })(document, 'script', '//s.spolecznosci.net/js/core2-min.js');
    `;  

    createScriptInit.innerHTML = `
         var _qasp = _qasp || [];
        _qasp.push('go');
        _qasp.push(['setFastPAID','sadFronda']);
    `;  
    //createEl.src = 'about:blank';
    document.body.appendChild(createEl);
    createEl.contentDocument.head.appendChild(createScript);

    [...document.querySelectorAll('div[class="spolecznoscinet"]')].forEach(x => {
    	 createEl.contentDocument.write(`<div class="spolecznoscinet" id=${x.id}></div>`)
	});

    createEl.contentDocument.body.appendChild(createScriptInit);
    //var exec = createEl.contentWindow;
    //exec.eval( someFunction.toString() ); 
    
}
