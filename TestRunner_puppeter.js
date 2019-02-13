const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const { PendingXHR } = require("pending-xhr-puppeteer");

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
			await page.emulate(emulatedDevices[loop]);
			await page.goto( `https://${site}` , {
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

			await page.evaluate(() => {
				document
					.querySelectorAll('[id^="spolecznosci"]')
					.forEach(x => (x.style.border = "2px solid #E8272C"));
				//return items
			});

			await page.screenshot({path: `${site}-${emulatedDevices[loop].name}-scr.png`,fullPage: true});
			await page.waitFor(2000);
			console.log("Dimensions:", dimensions);
		}
	}

	//await browser.close()
})();

const sites = [
	"kwejk.pl",
	"jbzdy.pl"
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
