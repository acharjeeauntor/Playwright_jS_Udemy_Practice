const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../../utils/APiUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Bahrain", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

})

test("Network Stubbing : Intercept / mocking network response call: practice", async ({ page }) => {

  let responseObject = [{
    "id": 6,
    "title": "Auntor Acharja",
    "author": "Gerald F. Scott",
    "genre": "novel",
    "price": "9.95",
    "rating": "★★★★★",
    "stock": "1"
  }]


  await page.route("https://danube-webshop.herokuapp.com/api/books", (route) => {
    
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(responseObject)
    })
  })

  await page.goto("https://danube-webshop.herokuapp.com/")

 // await page.pause()

})

test.only('Intercept / mocking network request call: practice', async ({ page }) => {
  page.addInitScript(value => {

    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");



  await page.locator("button[routerlink*='myorders']").click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62b4479de26b7e1a10eea421",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62b44749e26b7e1a10eea3ec' })
  )
  await page.locator("button:has-text('View')").first().click();
  await page.pause()

});

test("Network abort", async ({ page }) => {
  page.route(route => route.abort())
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  await page.pause()
})

test("Network abort:block css", async ({ page }) => {
  page.route("**/*.css", route => route.abort())
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  await page.pause()
})


test("Network abort:block images", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  await page.locator("#username").type("rahulshettyacademy")
  await page.locator("#password").type("learning")
  page.route("**/*.{jpg,png,jpeg}", route => route.abort())
  await page.locator("#signInBtn").click()
  await page.waitForTimeout(50000)
  await page.pause()
})

test("Network request-response api event", async ({ page }) => {

  page.on('request', request => console.log(`>> ${request.method()} ${request.resourceType()} ${request.url()}`))
  page.on('response', response => console.log(`<< ${response.url()}, ${response.status()}`))

  await page.goto("https://www.etsy.com/")
  await page.locator("#global-enhancements-search-query").fill("gift box")
  await page.keyboard.press("Enter")
})

test("Network request abort and continue", async ({ page }) => {

  await page.route("**/*", route => {
    if (route.request().resourceType() === 'image') {
      return route.abort()
    } else {
      return route.continue()
    }
  })


  await page.goto("https://www.etsy.com/")
  await page.locator("#global-enhancements-search-query").fill("gift box")
  await page.keyboard.press("Enter")
})



