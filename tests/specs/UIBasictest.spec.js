const { test, expect } = require("@playwright/test")

test("Run by browser context", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
})

test.only("Run basic UI", async ({ page }) => {
    const blinkingTextLocator = page.locator('[href*="documents-request"]')

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("#username").type("rahulshettyacademy")
    await page.locator("#password").type("learning")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked()
    await page.locator("select").selectOption("consult")
    await page.locator("#terms").check()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    //await expect(blinkingTextLocator).toHaveClass('blinkingText');
    await expect(blinkingTextLocator).toHaveAttribute('class', 'blinkingText')
})



test("Handle Multiple Tab", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const blinkingTextLocator = page.locator('[href*="documents-request"]')
    const userNameLocator = page.locator("#username")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")


    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingTextLocator.click()
    ])

    const text = await newPage.locator(".top-left ul li").textContent()
    const uName = text.split("@")[1]
    await userNameLocator.type(uName)
    //await page.pause()
})