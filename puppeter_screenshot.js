const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 })
  await page.goto('https://kwejk.pl/',{waitUntil: 'networkidle2'});
  


  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });


  await page.waitFor(10000)
  await autoScroll(page);
  
  await page.evaluate( () => {
  	document.querySelectorAll('[id^="spolecznosci"]').forEach(x => x.style.border='2px solid #E8272C')
  	//return items
  })

  await page.screenshot({path: 'screenshot.png',fullPage: true});

  console.log('Dimensions:', dimensions);
  //console.log(ads)

  await browser.close();
})();


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                	window.scrollBy(0, 0);
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });
}

