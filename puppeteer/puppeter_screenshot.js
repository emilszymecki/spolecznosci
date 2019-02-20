const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
const { PendingXHR } = require('pending-xhr-puppeteer');

(async () => {
  
   const browser = await puppeteer.launch({headless:true,ignoreHTTPSErrors: true,args: ['--start-maximized']});
//executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
//userDataDir: 'C:/Users/Emil/AppData/Local/Google/Chrome/User Data/Profile 4',
  
  for(let loop in emulatedDevices){
    console.log(emulatedDevices[loop])
    const page = await browser.newPage();
    const pendingXHR = new PendingXHR(page);
    //await page.setViewport({ width: 1680, height: 1050 })
    await page.emulate(emulatedDevices[loop]);
    await page.goto('https://jbzdy.pl'/*'https://kwejk.pl'*/,{waitUntil: 'networkidle2'});
    


    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });

    try {
      await page.waitForSelector('.intro_acceptAll--SPx18r')
      await page.click('.intro_acceptAll--SPx18r');
    } catch (error) {
      console.log("The element didn't appear.")
    }


    await page.waitFor(15000)
    await autoScroll(page);
    await autoScrollReverse(page)

    await Promise.race([
      pendingXHR.waitForAllXhrFinished(),
      new Promise(resolve => {
          setTimeout(resolve, 100000);
      }),
  ]);

    
    await page.evaluate( () => {
      document.querySelectorAll('[id^="spolecznosci"]').forEach(x => x.style.border='2px solid #E8272C')
      //return items
    })

    await page.screenshot({path: `${emulatedDevices[loop].name}-scr.png`,fullPage: true});

    console.log('Dimensions:', dimensions);
  }
  await browser.close();
})();


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 200;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                	  //window.scrollBy(0,-(document.body.scrollHeight))
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
}

async function autoScrollReverse(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = document.body.scrollHeight;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = 0;
                window.scrollBy(0, -distance);
                totalHeight -= distance;
                if(totalHeight <= scrollHeight){
                    //window.scrollBy(0,-(document.body.scrollHeight))
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
}


const emulatedDevices = [
  {
    name: 'Desktop 1920x1080',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1920,
      height: 1080
    }
  },
  {
    name: 'Desktop 1024x768',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1024,
      height: 768
    }
  },
  devices['iPhone X'],
  devices['Galaxy S5'],
]
