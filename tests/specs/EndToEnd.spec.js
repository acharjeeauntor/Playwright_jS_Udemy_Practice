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

    const count = await products.count()

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            console.log(await products.nth(i).locator('b').textContent())
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }

    await page.pause()


})