const { test, expect } = require("@playwright/test")
const projectData = require("../../test-data/EndToEndTestData.json")

test("End To End", async ({ page }) => {
    const products = page.locator(".card-body")
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").type(projectData.email)
    await page.locator("#userPassword").type(projectData.password)
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle')
    //await page.waitForNavigation()

    console.log(await page.locator(".card-body b").allTextContents())

    const count = await products.count()
    console.log(count)

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === projectData.productName) {
            console.log(await products.nth(i).locator('b').textContent())
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }


    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('adidas original')").isVisible()
    expect(bool).toBeTruthy()
    await page.locator("text=Checkout").click()


    await page.locator("[placeholder*='Country']").type("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

})

for(const data of projectData){
    test.only(`Data driven test for ${data.email} account`, async ({ page }) => {
        const products = page.locator(".card-body")
        await page.goto("https://rahulshettyacademy.com/client")
        await page.locator("#userEmail").type(data.email)
        await page.locator("#userPassword").type(data.password)
        await page.locator("#login").click()
        await page.waitForLoadState('networkidle')
       
        console.log(await page.locator(".card-body b").allTextContents())
    
        const count = await products.count()
        console.log(count)
    
        for (let i = 0; i < count; i++) {
            if (await products.nth(i).locator("b").textContent() === data.productName) {
                console.log(await products.nth(i).locator('b').textContent())
                await products.nth(i).locator("text= Add To Cart").click()
                break
            }
        }
    
        await page.locator("[routerlink*='cart']").click()
        await page.locator("div li").first().waitFor()
        const bool = await page.locator("h3:has-text('adidas original')").isVisible()
       // expect(bool).toBeTruthy()
        await page.locator("text=Checkout").click()
    
    })
}

