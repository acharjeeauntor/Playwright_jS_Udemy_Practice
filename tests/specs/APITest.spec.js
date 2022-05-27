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

test.beforeAll(async ({request}) => {
    const apiUtils = new APIUtils(request, loginPayload)
    response = await apiUtils.orderAPI(orderPayload)


})

test("Place a Order", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token)


    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("[routerlink*='myorders']").click()


    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
})


