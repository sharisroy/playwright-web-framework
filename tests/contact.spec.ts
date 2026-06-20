import {test, expect} from '@playwright/test'
import ContactPage from '../pages/contact.page'

test.describe('Contact', () => {
    test("Fill contact form and verify success message", async ({page}) => {
        const contact = new ContactPage(page)
        await contact.navigate()

        // fill out the input fields
        await contact.fillForm('Test name', 'test@mail.com', '1234567890', 'This is a test message')

        // example soft assertion: it records a failure but does NOT stop the test.
        // this one is intentionally wrong — uncomment it to see the failure collected below.
        // await expect.soft(contact.messageInput).toHaveValue('Fail test message')

        // submit the form
        await contact.submit()

        // soft failures don't throw, so check for them explicitly here.
        // if any soft assertion above failed, this stops the test before the success check runs.
        expect(test.info().errors).toHaveLength(0)

        // verify the success message
        await expect(contact.successMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    })
})
