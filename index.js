const puppeteer = require('puppeteer');

const urls = [
  "https://play.google.com/store/apps/details?id=net.hubalek.android.apps.reborn.pro",
  "https://play.google.com/store/apps/details?id=com.soloseal.awesomealarmclock",
  "https://play.google.com/store/apps/details?id=eu.notsobright.themes.blackgold",
  "https://play.google.com/store/apps/details?id=com.flyersoft.moonreaderp",
  "https://play.google.com/store/apps/details?id=jp.co.yahoo.android.sports.npb.textlive",
  "https://play.google.com/store/apps/details?id=com.knbmedia.findthemalldinolite",
  "https://play.google.com/store/apps/details?id=com.tappytaps.android.babymonitor3g",
  "https://play.google.com/store/apps/details?id=com.knbmedia.findthemall",
  "https://play.google.com/store/apps/details?id=com.azamsoft_cantos_do_canario_hd",
  "https://play.google.com/store/apps/details?id=jp.softbank.mb.basketball",
  "https://play.google.com/store/apps/details?id=jp.moviecam_p",
  "https://play.google.com/store/apps/details?id=com.vito.lux",
  "https://play.google.com/store/apps/details?id=jp.co.unbalance.android.gocsdl",
  "https://play.google.com/store/apps/details?id=jp.nicovideo.nicobox",
  "https://play.google.com/store/apps/details?id=jp.co.sharp.hms.smartlink",
  "https://play.google.com/store/apps/details?id=com.square_enix.android_googleplay.ffxivcomapp_j",
  "https://play.google.com/store/apps/details?id=com.cookpad.android.activities",
  "https://play.google.com/store/apps/details?id=jp.co.litalico.brushinghero",
  "https://play.google.com/store/apps/details?id=jp.co.pepperfs.android",
  "https://play.google.com/store/apps/details?id=com.night.die.horror.excape.game"];

(async () => {
  const browser = await puppeteer.launch({headless: true, args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--lang=ja,en-US;q=0.9,en;q=0.8']});
  try{
    const pages = await browser.pages();
    const page = pages[0];
    for(var u of urls){
      const auth = await fetch(page, u);
      console.log(auth);
    }
  }catch(e){
    throw e;
  }finally{
    await browser.close();
  }
})();

async function fetch(page, url){
  await page.goto(url, {waitUntil: 'domcontentloaded'});
  await page.evaluate(() => {
    Array.from(document.querySelectorAll('a'))
      .filter(x => RegExp('詳細を表示').test(x.textContent))
      .slice(-1)[0]
      .click();
  });
  await page.waitFor(4000);
  const xs = await page.evaluate(() => {
    const c =  Array.from(document.querySelectorAll('div'))
      .filter(x => RegExp('このアプリには次の権限が必要です').test(x.textContent))
      .slice(-1)[0]
      .parentNode;
    return Array.from(c.querySelectorAll('li')).map(x => x.textContent);
  });
  return xs;
}
