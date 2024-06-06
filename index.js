const express = require('express'); // Adding Express
const app = express(); // Initializing Express

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
 
puppeteer.use(StealthPlugin())
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: '1de5fe0d5165ecf80a44643d8785f0ca' // Replace this with your own 2Captcha API key
        },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
);

app.get('/test',async function(req,res){

      res.send("test server")
})

app.get('/it', async function (req, res) {

   
    let browser;

  
    try {
        browser = await puppeteer.launch({
            headless: false,

            args: ['--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
              //  `--proxy-server=${proxyServer}`
            ]
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
        await page.setViewport({ width: 1366, height: 768 });
        await page.setDefaultNavigationTimeout(60000);
        await page.setDefaultTimeout(60000);



        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('#panAdhaarUserId');
        await page.type('#panAdhaarUserId', 'DSYPP0141J', { delay: 100 });

        await page.evaluate(() => {
            document.querySelector('.large-button-primary.width.marTop16').click();
        });

        await page.waitForNavigation();
        await page.screenshot({ path: 'password.png' });

        await page.waitForSelector('#passwordCheckBox-input');

        await page.evaluate(() => {
            document.querySelector('#passwordCheckBox-input').click();
        });

        await page.waitForSelector('#loginPasswordField');
        await page.type('#loginPasswordField', 'Pattanath7@', { delay: 0 });


        await page.waitForSelector('.large-button-primary.width.marTop26');

       // await page.authenticate('DSYPP0141J', 'Pattanath7@');

        await page.evaluate(() => {
            document.querySelector('.large-button-primary.width.marTop26').click();
        });


        const pageContent = await page.content();


        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(pageContent));



    } catch (error) {
        console.error("Error encountered:", error);
        if (browser) {
            await browser.close();
        }
        // Send an error response
        // Assuming `res` is defined in your actual code
        res.status(500).send("An error occurred");
    }


})


app.get('/it2', async function (req, res) {

   
    let browser;

  
    try {
        browser = await puppeteer.launch({
            headless: true,

            args: ['--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
              //  `--proxy-server=${proxyServer}`
            ]
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
        await page.setViewport({ width: 1366, height: 768 });
        await page.setDefaultNavigationTimeout(60000);
        await page.setDefaultTimeout(60000);



        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('#panAdhaarUserId');
        await page.type('#panAdhaarUserId', 'DSYPP0141J', { delay: 100 });

        await page.evaluate(() => {
            document.querySelector('.large-button-primary.width.marTop16').click();
        });

        await page.waitForNavigation();
        await page.screenshot({ path: 'password.png' });

        await page.waitForSelector('#passwordCheckBox-input');

        await page.evaluate(() => {
            document.querySelector('#passwordCheckBox-input').click();
        });

        await page.waitForSelector('#loginPasswordField');
        await page.type('#loginPasswordField', 'Pattanath7@', { delay: 0 });


        await page.waitForSelector('.large-button-primary.width.marTop26');

       // await page.authenticate('DSYPP0141J', 'Pattanath7@');

        await page.evaluate(() => {
            document.querySelector('.large-button-primary.width.marTop26').click();
        });


        const pageContent = await page.content();


        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(pageContent));



    } catch (error) {
        console.error("Error encountered:", error);
        if (browser) {
            await browser.close();
        }
        // Send an error response
        // Assuming `res` is defined in your actual code
        res.status(500).send("An error occurred");
    }


})


// Making Express listen on port 7000
app.listen(7000, function () {
    console.log('Running on port 7000.');
});



