const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../../utils/APiUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Bahrain", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }
let fakePayLoadOrders = [{ data: [], message: "No Orders" }];

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

})


test('Intercept / mocking network response call: practice', async ({ page }) => {
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);
  // console.log(response.token)
 


  await page.route("**/6298e803e26b7e1a10ecbba3",
    async route => {
      // "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6298e803e26b7e1a10ecbba3"
      const response = await page.request.fetch(route.request());
      route.fulfill(
        {
          contentType: 'application/json',
          body: JSON.stringify(fakePayLoadOrders)
        });
      //intercepting response - APi response->{ playwright fakeresponse}->browser->render data on front end
    });
    await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='myorders']").click();
  //await page.pause();
  console.log(await page.locator(".mt-4").textContent());

});

test('Intercept / mocking network request call: practice', async ({ page }) => {
  page.addInitScript(value => {

    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");



  await page.locator("button[routerlink*='myorders']").click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6218dad22c81249b296508b9",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
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
<<<<<<< HEAD
  page.on('request', request => console.log(`>> ${request.method()} ${request.resourceType()} ${request.url()}`))
  page.on('response', response => console.log(`<< ${response.url()}, ${response.status()}`))
=======
  
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
>>>>>>> e1fefa3e187274afdadf6593892faa65c98cc270

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

test.only("Network Stubbing", async ({ page }) => {

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

  await page.pause()

})