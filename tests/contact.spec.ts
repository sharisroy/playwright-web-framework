import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import ContactPage from '../pages/contact.page'

test.describe('Contact', () => {
    let contact: ContactPage

    test.beforeEach(async ({page}) => {
        contact = new ContactPage(page)
        await contact.navigate()
    })

    test("Fill contact form and verify success message", async () => {
        // generate random test data for this run
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const phone = faker.string.numeric(10)
        const message = faker.lorem.sentence()

        // fill out the input fields with the generated data
        await contact.fillForm(name, email, phone, message)

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
