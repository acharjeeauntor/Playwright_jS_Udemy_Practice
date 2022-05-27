const { test, expect } = require("@playwright/test")

test("More valiation1", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.goto("http://google.com/")
    await page.goBack()
    await page.goForward()

})


test("More valiation2", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    await page.locator("#show-textbox").click()
    await expect(page.locator("#displayed-text")).toBeVisible()
})

test("More valiation3", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on("dialog", async (dialog) => {
        console.log(dialog.message())
        await dialog.accept()
    })

    await page.locator("#confirmbtn").click()
})

test("More valiation4", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on("dialog", async (dialog) => {
        console.log(dialog.message())
        await dialog.dismiss()
    })
    await page.locator("#confirmbtn").click()
})

test("More validation 5",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.locator("#mousehover").hover()
    await page.pause()
})


test.only("Frame",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const framePages = page.frameLocator("#courses-iframe")
    await framePages.locator("li a[href*='lifetime-access']:visible").click()
    const text = await framePages.locator(".text h2").textContent()
    const sub = text.split(" ")[1]
    console.log(sub)
    expect(sub).toEqual("13,522")
})