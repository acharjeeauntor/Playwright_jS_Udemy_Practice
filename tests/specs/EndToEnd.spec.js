const { test, expect } = require("@playwright/test")

test("End To End", async ({ page }) => {
    const products = page.locator(".card-body")
    const productName = "adidas original"
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").type("anshika@gmail.com")
    await page.locator("#userPassword").type("Iamking@000")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle')
    await page.waitForNavigation()

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

    // await page.pause()

    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('adidas original')").isVisible()
    expect(bool).toBeTruthy()


    await page.locator("text=Checkout").click()
    await page.locator("[placeholder*='Country']").type("ban", { delay: 900 })
    const dropDown = page.locator(".ta-results")
    await dropDown.waitFor()
    const optionCount = await dropDown.locator("button").count()
    console.log(optionCount)

    for (let i = 0; i < optionCount; i++) {
        if (await dropDown.locator("button").nth(i).textContent() === " Bangladesh") {
            
            await dropDown.locator("button").nth(i).click()
            break
        }
    }

    await page.pause()


})