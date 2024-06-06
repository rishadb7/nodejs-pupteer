const express = require('express'); // Adding Express
const app = express(); // Initializing Express
const puppeteer = require('puppeteer');
const { chromium } = require('playwright'); // Importing Playwright


app.get('/', function (req, res) {

    // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
    puppeteer.launch({
     
        headless: true,
       // executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process',
            '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process',
           // '--proxy-server=13.235.242.121 :7000'

        ]
    }
    ).then(async function (browser) {
        
        const page = await browser.newPage();
        console.log("Before loading page")
        // await page.setViewport({ width: 1366, height: 768 });
        // await page.setDefaultNavigationTimeout(10000);
        // await page.setDefaultTimeout(10000);
        await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', { waitUntil: 'domcontentloaded', timeout: 0 });
        console.log("Login page loaded");
        const pageTitle = await page.title();
        console.log("Current page title:", pageTitle);
        await browser.close();
        res.send(pageTitle);

    });
});

app.get('/playwrite', async function (req, res) {
    // Launching the Playwright controlled headless browser and navigate to the Digimon website
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process',
            '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    });
    
    const page = await browser.newPage();
    console.log("Before loading page");

    // Navigate to the login page
    await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', { waitUntil: 'domcontentloaded', timeout: 0 });
    console.log("Login page loaded");
    
    // Get the title of the page
    const pageTitle = await page.title();
    console.log("Current page title:", pageTitle);
    
    // Close the browser
    await browser.close();
    
    // Send the page title as the response
    res.send(pageTitle);
});

app.get('/test',async function (req,res){

    res.send("test sroute")
})


// app.get('/it', async function (req, res) {



//     try {
//         const browser = await puppeteer.launch({
//             headless: true,
//             executablePath: '/usr/bin/chromium-browser',
//             args: ['--disable-web-security',
//                 '--disable-features=IsolateOrigins,site-per-process',
//                 '--no-sandbox', '--disable-setuid-sandbox', '--single-process'
//             ]
//         });

//         const page = await browser.newPage();
//         await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
//         await page.setViewport({ width: 1366, height: 768 });
//         await page.setDefaultNavigationTimeout(60000);
//         await page.setDefaultTimeout(60000);



//         await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login', { waitUntil: 'load', timeout: 0 });

//         await page.waitForSelector('#panAdhaarUserId');
//         await page.type('#panAdhaarUserId', 'DSYPP0141J', { delay: 100 });

//         await page.evaluate(() => {
//             document.querySelector('.large-button-primary.width.marTop16').click();
//         });

//         await page.waitForNavigation();
//         await page.screenshot({ path: 'password.png' });

//         await page.waitForSelector('#passwordCheckBox-input');

//         await page.evaluate(() => {
//             document.querySelector('#passwordCheckBox-input').click();
//         });

//         await page.waitForSelector('#loginPasswordField');
//         await page.type('#loginPasswordField', 'Pattanath7@', { delay: 0 });


//         await page.waitForSelector('.large-button-primary.width.marTop26');



//         await page.evaluate(() => {
//             document.querySelector('.large-button-primary.width.marTop26').click();
//         });


//         const pageContent = await page.content();


//         res.set('Content-Type', 'text/html');
//         res.send(Buffer.from(pageContent));



//     } catch (error) {
//         console.error("Error encountered:", error);
//         if (browser) {
//             await browser.close();
//         }
//         // Send an error response
//         // Assuming `res` is defined in your actual code
//         res.status(500).send("An error occurred");
//     }


// })

app.listen(7000, function () {
    console.log(`Running on port 7000.`);
});



