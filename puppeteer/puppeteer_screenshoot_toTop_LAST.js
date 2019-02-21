const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const { PendingXHR } = require("pending-xhr-puppeteer");
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath:  "C:/Users/Administrator/AppData/Local/Chromium/Application/chrome.exe",
		userDataDir: "C:/Users/Administrator/AppData/Local/Chromium/User Data/Default/",
		args: ["--start-maximized",'--use-gl=desktop'],
		ignoreHTTPSErrors: true
		//args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	for(let site of sites){
		for (let loop in emulatedDevices) {
			const page = await browser.newPage();
			const pendingXHR = new PendingXHR(page);
			//await page.setViewport({ width: 1680, height: 1050 })
			const urls = new URL(site)
			const iter = sites.indexOf(site)
			await page.emulate(emulatedDevices[loop]);
			await page.goto( site , {
				waitUntil: "networkidle2"
			});

			// Get the "viewport" of the page, as reported by the page.
			const dimensions = await page.evaluate(() => {
				return {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight,
					deviceScaleFactor: window.devicePixelRatio
				};
			});

			await page.waitFor(3000);
			await autoScroll(page);
			await autoScrollReverse(page);

			await Promise.race([
				pendingXHR.waitForAllXhrFinished(),
				new Promise(resolve => {
					setTimeout(resolve, 40000);
				})
			]);


			var placements = await page.evaluate( async () => {
				/*var all = Array.from(document.querySelectorAll('[id^="spolecznosci"]'))
				var pos	= all.map( x => x.getBoundingClientRect().top + (window.scrollY / 2))
				return pos*/
				var all = Array.from(document.querySelectorAll('[id^="spolecznosci"]'))
				var pos	= all.map( x => x.id)
				return pos
		    })

		    async function screenshotDOMElement(selector, padding = 0) {
			  const rect = await page.evaluate(selector => {

			  	function getCoords(elem) { // crossbrowser version
				    var box = elem.getBoundingClientRect();
				    var body = document.body;
				    var docEl = document.documentElement;
				    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
				    var clientTop = docEl.clientTop || body.clientTop || 0;
				    var top  = box.top +  scrollTop - clientTop;
				 
				    return Math.round(top);
				}

			    const element = document.getElementById(selector);
			   	element.scrollIntoView()
			   	window.scrollBy(0, -65)
			   	const offsetTop = getCoords(element)
			    const {x, y, width, height, top} = element.getBoundingClientRect();
			    const bodyRect = document.body.getBoundingClientRect()
			     /*
			     if(element.children.length){

						const txt = document.createElement('p');
					    txt.innerHTML = `${selector} size:${width}x${height}`;
						txt.style.background = "red";
						txt.style.position = "relative";
						txt.style.display = "block";
						//element.style.border='2px solid blue'
						element.insertBefore(txt, this.firstChild);

			    }*/

			    return {left: x, top: y, width, height, id: element.id, children: element.children.length,offsetTop:offsetTop};
			  }, selector);

			  console.log(rect)
			  if(rect.children !== 0 || (rect.width !== 0 && rect.height !== 0)){
			  	await page.waitFor(2000);
			  	await fs.mkdir(`${__dirname}/${urls.host}_${iter}/${emulatedDevices[loop].name}`, { recursive: true }, (err) => {
				  if (err) throw err;
				});
			  	return await page.screenshot({
			  	  path: `${__dirname}/${urls.host}_${iter}/${emulatedDevices[loop].name}/${urls.host}-${emulatedDevices[loop].name}-${selector}-elm.png`,
			  	   clip: {
      						x: 0,
      						y: 0,
      						width: dimensions.width,
      						height: rect.offsetTop + rect.height + Math.round( 10 * rect.height / 100)
    					},
			  	});
			  }else{
			  	await page.waitFor(500);
			  }
			}

			for(scroller of placements){
				try{
				await screenshotDOMElement(scroller)
				}catch(e){
					console.log("zonki",e)
				}
			}

			await page.screenshot({path: `${urls.host}_${iter}-${emulatedDevices[loop].name}-all.png`,fullPage: true});
			await page.waitFor(2000);
			
			console.log("Dimensions:", dimensions);
		}
	}

	await browser.close()
})();

const sites = [
	'http://fdb.pl?snet={2651,199836,e984703c556ed5cc1b811800c27e6d8e,1}',
	'http://fdb.pl?snet={2652,199835,ea5edcf6f80e658b300816877eaf6619,1}',
	'https://www.cosmopolitan.pl/?snet={2738,199834,812441417f319f1db33a93b98c1952e0,1}',
];


async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			var totalHeight = 0;
			var distance = 200;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if (totalHeight >= scrollHeight) {
					//window.scrollBy(0,-(document.body.scrollHeight))
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}

async function autoScrollReverse(page) {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			var totalHeight = document.body.scrollHeight;
			var distance = 100;
			var timer = setInterval(() => {
				var scrollHeight = 0;
				window.scrollBy(0, -distance);
				totalHeight -= distance;
				if (totalHeight <= scrollHeight) {
					//window.scrollBy(0,-(document.body.scrollHeight))
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}


const emulatedDevices = [
	{
		name: "Desktop 1920x1080",
		userAgent:
			"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36",
		viewport: {
			width: 1920,
			height: 1080
		}
	},
	{
		name: "Desktop 1024x768",
		userAgent:
			"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36",
		viewport: {
			width: 1024,
			height: 768
		}
	},
	/*devices["iPhone X"],
	devices["Galaxy S5"]*/
];
