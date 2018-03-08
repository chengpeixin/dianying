const puppeteer = require('puppeteer');
const slleep =time=>{return new Promise(resolve=>{setTimeout(resolve,time)})}
const videoBase = `https://movie.douban.com/subject/26861685/`
const doubanID = `26861685`;
(async () => {
  console.log('crawler run start')
  const browser = await puppeteer.launch({
    args:['--no--sandbox'],
    executablePath: './../../chrome/chrome',
    headless: false
  });


  const page = await browser.newPage();

  await page.goto(`https://movie.douban.com/subject/${doubanID}`,{waitUntil:"networkidle2"});
  await slleep(1000)

  const result = await page.evaluate(()=>{
    var $ = window.$;
    var it = $('.related-pic-video')
    if (it && it.length >0){
        var link = it.attr('href')
        var cover = it.find('img').attr('src')
        return {
            link,
            cover
        }
    }
    return {}
  })
  /**
   * video : 视频地址
   */
  let video;

  if (result.link){
      
      await page.goto(result.link,{
          waitUntil:'networkidle2'
      })
      await slleep(2000)
      video = await page.evaluate(()=>{
          var $ = window.$
          var it = $('source')
          if (it && it.length > 0){
              return it.attr('src')
          }
          return ''
      })
  }

  const data = {
      video,
      doubanID,
      "cover":result.cover
  }
  browser.close();
  process.send({data})
  process.exit(0)
})();