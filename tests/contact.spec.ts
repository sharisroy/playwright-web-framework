import {test, expect} from '@playwright/test'

test.describe('Contact', () => {
    test("Fill contact form and verify success message", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com/contact")

        // fill out the input fields
        await page.locator('.contact-name input').fill('Test name')
        await page.locator('.contact-email input').fill('test@mail.com')
        await page.locator('.contact-phone input').fill('1234567890')
        await page.locator('.contact-message textarea').fill('This is a test message')

        // example soft assertion: it records a failure but does NOT stop the test.
        // this one is intentionally wrong — uncomment it to see the failure collected below.
        // await expect.soft(page.locator('.contact-message textarea')).toHaveValue('Fail test message')

        // submit the form
        await page.locator('button[type=submit]').click()

        // soft failures don't throw, so check for them explicitly here.
        // if any soft assertion above failed, this stops the test before the success check runs.
        expect(test.info().errors).toHaveLength(0)

        // verify the success message
        const successMessage = page.locator("div[role='alert']")
        await expect(successMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    })
})
