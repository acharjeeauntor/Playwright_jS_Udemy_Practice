const { test, expect } = require("@playwright/test")

test("Visual Testing : Screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#displayed-text").screenshot({ path: "ss1.png" })
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    await page.screenshot({path:"SS2.png"})

})

test.only("Visual Testing : Comparision-pass",async({page})=>{
    await page.goto("https://google.com")
    expect(await page.screenshot()).toMatchSnapshot("loading.png")
})

test("Visual Testing : Comparision-Fail",async({page})=>{
    await page.goto("https://www.rediff.com/")
    expect(await page.screenshot()).toMatchSnapshot("mainPage.png")
})