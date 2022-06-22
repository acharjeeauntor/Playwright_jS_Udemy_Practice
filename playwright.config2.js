// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  workers:3,
  retries:1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  projects: [
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: true,
        screenshot: "only-on-failure",
        trace: "on",
        viewport: {
          width: 1200,
          height: 700
        }
      }
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        headless: !true,
        screenshot: "only-on-failure",
        trace: "on",
        viewport: {
          width: 1200,
          height: 700
        }
      }
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: true,
        trace: "on",
        ...devices['Galaxy Tab S4'],
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        screenshot: "only-on-failure",
        video:"retain-on-failure"
      }
    }
  ],
  reporter: 'html',

}



module.exports = config;
