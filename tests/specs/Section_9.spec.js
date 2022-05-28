const { test, expect } = require("@playwright/test")
let webContext;


test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").type("anshika@gmail.com")
    await page.locator("#userPassword").type("Iamking@000")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle')
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })
})


test("Add to cart product", async () => {
    const page = await webContext.newPage()
    const productName = "adidas original"
    const products = page.locator(".card-body")

    await page.goto("https://rahulshettyacademy.com/client")
    await page.waitForLoadState('networkidle')

    const count = await products.count()

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            console.log(await products.nth(i).locator('b').textContent())
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }


    await page.locator("[routerlink*='cart']").click()
})



test("Checkout product", async () => {
    const page = await webContext.newPage()
    const productName = "adidas original"
    const products = page.locator(".card-body")
    
    await page.goto("https://rahulshettyacademy.com/client")
    await page.waitForLoadState('networkidle')

    const count = await products.count()

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

})