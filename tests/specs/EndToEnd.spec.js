const { test, expect } = require("@playwright/test")

test("End To End", async ({ page }) => {
    const email = "anshika@gmail.com"
    const products = page.locator(".card-body")
    const productName = "adidas original"
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").type(email)
    await page.locator("#userPassword").type("Iamking@000")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle')
    //await page.waitForNavigation()

    console.log(await page.locator(".card-body b").allTextContents())

    const count = await products.count()
    console.log(count)

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
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