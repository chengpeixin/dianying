const puppeteer = require('puppeteer');
const slleep =time=>{return new Promise(resolve=>{setTimeout(resolve,time)})}
(async () => {
  console.log('crawler run start')
  const browser = await puppeteer.launch({
    args:['--no--sandbox'],
    dumpio:false,
    executablePath: './../../chrome/chrome',
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=%E7%94%B5%E5%BD%B1');
  await slleep(3000)
  await page.awaitForSelector('.more')

  for (let i=0;i<1;i++){
    await slleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(()=>{
    var $ = window.$;
    var items = $('.list-wp a')
    var links = []
    if (items.length>=1){
      items.each(function(i,v){
        var it = $(v)
        var doubanID = it.find('div').data('id')
        var title = it.find('.title').text()
        var rate = Number(it.find('.rate').text())
        var poster = it.find('img').attr('src').replace('s_ratio','l_ratio')

        links.push({
          doubanid,
          title,
          rate,
          poster
        })
      })
      return links;
    }
  })
  browser.close();

  console.log(result)
})();