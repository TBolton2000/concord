import puppeteer from 'puppeteer';

describe( 'Testing GUI behaviors for textfields on signup page', () => {
    beforeEach(async() => {
        jest.setTimeout(30000);
    });
    test('Validating Invalid Email and Mismatched Email GUI', async () => {
        // Test for determining if error for invalid email is showing in the UI
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/signup');
        await page.waitForSelector("#email");
        await page.click('#email');
        await page.type('#email', 'foo');
        let errorID = await page.$eval('#email-helper-text', (input) => input.id);
        expect(errorID).toBe('email-helper-text');
    
        // Test for determining if error for mismatched emails is showing in the UI
        await page.type('#confirm-email', 'bar');
        let confirmedErrorID = await page.$eval('#confirm-email-helper-text', (input) => input.id);
        expect(confirmedErrorID).toBe('confirm-email-helper-text');
        await browser.close();
    });
    
    test('Validating Too Short/Long Password and Mismatched Password GUI', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/signup');
        await page.waitForSelector("#password");
        await page.click('#password');
        // This password is under 10 characters, should show an error message
        await page.type('#password', 'Lorem ips');
        let errorID = await page.$eval('#password-helper-text', (input) => input.id);
        expect(errorID).toBe('password-helper-text');
        // This password will be 255 characters which exceeds the limit
        await page.type('#password', 'um dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu');
        expect(errorID).toBe('password-helper-text');
    
        // Test to show if mismatched passwords is showing in the UI
        await page.type('#confirm-password', 'shefShilleh');
        let confirmedErrorID = await page.$eval('#confirm-password-helper-text', (input) => input.id )
        expect(confirmedErrorID).toBe('confirm-password-helper-text');
        await browser.close();
    });
})

