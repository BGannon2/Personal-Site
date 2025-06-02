const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/../src/index.html');
  
  const links = await page.$$eval('a', links => 
    links.map(link => ({ 
      href: link.href, 
      text: link.textContent.trim(),
      innerHTML: link.innerHTML.substring(0, 100)
    }))
  );
  
  console.log('All links found:');
  links.forEach((link, i) => {
    console.log(`${i + 1}. Text: '${link.text}' | HTML: '${link.innerHTML}'`);
  });
  
  const problematicLinks = links.filter(link => {
    const text = link.text.toLowerCase();
    return text === 'click here' || text === 'read more' || text === 'here' || text === '';
  });
  
  console.log('\nProblematic links:');
  problematicLinks.forEach((link, i) => {
    console.log(`${i + 1}. Text: '${link.text}' | HTML: '${link.innerHTML}'`);
  });
  
  await browser.close();
})();
