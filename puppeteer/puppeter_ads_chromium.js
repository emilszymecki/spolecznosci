const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const { PendingXHR } = require("pending-xhr-puppeteer");
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath:  "C:/Users/Administrator/AppData/Local/Chromium/Application/chrome.exe",
		userDataDir: "C:/Users/Administrator/AppData/Local/Chromium/User Data/",
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
			    const element = document.getElementById(selector);
			   	element.scrollIntoView()
			   	window.scrollBy(0, -65);
			    element.getBoundingClientRect()
			    const {x, y, width, height} = element.getBoundingClientRect();
			     
			     if(element.children.length){

						const txt = document.createElement('p');
					    txt.innerHTML = `${selector} size:${width}x${height}`;
						txt.style.background = "red";
						txt.style.position = "relative";
						txt.style.display = "block";
						//element.style.border='2px solid blue'
						element.insertBefore(txt, this.firstChild);

			    }

			    return {left: x, top: y, width, height, id: element.id, children: element.children.length};
			  }, selector);
			  console.log(rect)
			  if(rect.children !== 0 || (rect.width !== 0 && rect.height !== 0)){
			  	await page.waitFor(2000);
			  	await fs.mkdir(`${__dirname}/${urls.host}/${emulatedDevices[loop].name}`, { recursive: true }, (err) => {
				  if (err) throw err;
				});
			  	return await page.screenshot({
			  	  path: `${__dirname}/${urls.host}/${emulatedDevices[loop].name}/${urls.host}-${emulatedDevices[loop].name}-${selector}-elm.png`,
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

			await page.screenshot({path: `${urls.host}-${emulatedDevices[loop].name}-all.png`,fullPage: true});
			await page.waitFor(2000);
			
			console.log("Dimensions:", dimensions);
		}
	}

	//await browser.close()
})();

const sites = [
	"https://szafa.pl/?snet={305,198814,25df0e657c21856e10367fc1457f601a,1}",
	"https://www.astar.czest.pl/?snet={283,198779,12cd5de89830f6995179ed8294fe4117,1}",
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
	devices["iPhone X"],
	devices["Galaxy S5"]
];
