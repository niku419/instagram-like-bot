const puppeteer = require('puppeteer');
const YOUR_PASSWORD, YOUR_USERNAME;
(async () => {
  try{
    const browser = await puppeteer.launch({headless:false, slowMo:10});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com',{waitUntil :"networkidle2"});
  await page.waitFor(1000)
  await page.type('input[name="username"]',YOUR_USERNAME,{delay:500})
  await page.type('input[name="password"]',YOUR_PASSWORD,{delay:500})
  await page.waitForSelector('form>div>div:nth-child(3)>button')
  await page.click('form>div>div:nth-child(3)>button')
  await page.waitFor(10000)
  var searchUser = "_niku_419"
  await page.goto('https://www.instagram.com/'+searchUser,{waitUntil:"networkidle2"})
  await page.waitFor(10000)
  try{
    var stories = await page.$$eval('article>div>div>div>div>a', anchors => [].map.call(anchors, a => a.href))
    console.log(stories)
    for(let i=0;i<stories.length;i++){
      await page.goto(stories[i],{waitUntil: "networkidle2"})
      let isLikable= await page.$eval('section>span>button[type="button"]>div>span>svg',el => el.getAttribute("aria-label"))
      console.log(isLikable)
      if(isLikable == "Like"){
        await page.click('section>span>button')
      }
      await page.waitFor(3000)
    }
  }
  catch(error){
    throw "Some error occured"
  }
  

  await page.waitFor(5000)
  }catch(err){
    throw(err)
  }
  
})();
