const { test, expect, request } = require("@playwright/test")
const { APIUtils } = require("../../utils/APIUtils")
let response;

const loginPayload = {
    userEmail: "anshika@gmail.com", userPassword: "Iamking@000"
}

const orderPayload = { orders: [{ country: "Bahrain", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }

// test("Login API test using Context", async () => {
//     const apiContext = await request.newContext()
//     const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login/", {
//         data: requestPayload
//     })
//     expect(loginResponse.ok()).toBeTruthy()
//     const loginResponseJson = await loginResponse.json()
//     const token = loginResponseJson.token
//     console.log(token)
// })


// test.only("Login API test using only Request Fixture", async ({ request }) => {
//     const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login/", {
//         data: {
//             userEmail: "anshika@gmail.com",
//             userPassword: "Iamking@000"
//         }
//     })
//     expect(loginResponse.ok()).toBeTruthy()
//     const loginResponseJson = await loginResponse.json()
//     const token = loginResponseJson.token
//     console.log(token)
// })

test.beforeAll(async ({ request }) => {
    const apiUtils = new APIUtils(request, loginPayload)
    response = await apiUtils.orderAPI(orderPayload)


})

test("Place a Order", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token)


    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("button[routerlink*='myorders']").click()

    await page.locator("tbody").waitFor()
    const rows = page.locator("tbody tr")
    const count = await rows.count()

    for (let i = 0; i < count; i++) {
        const rowOrderId = await rows.nth(i).locator("[scope='row']").textContent()
        if (rowOrderId.includes(response.orderId)) {
            await rows.nth(i).locator('button').first().click()
            break
        }
    }

    const orderDetails = await page.locator(".col-text").textContent()
    expect(orderDetails.includes(response.orderId)).toBeTruthy()


})


