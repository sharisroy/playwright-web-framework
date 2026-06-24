import {test, expect} from '@playwright/test'
import path from 'path'
import UploadComponent from '../pages/component/upload.component'

test.describe('Waits: hard-coded, condition, and assertion', () => {
    let upload: UploadComponent

    test.beforeEach(async ({page}) => {
        upload = new UploadComponent(page)
        // open the cart page, which hosts the file upload form
        await page.goto('/cart')
    })

    test('Should wait for a large file upload to finish, then verify the success message', async () => {
        // resolve the path to the 5MB sample file: <project>/test-data/5MB_sample_file.pdf
        const filePath = path.join(__dirname, '../test-data/5MB_sample_file.pdf')

        // the component handles select-file + enable-button + click
        await upload.uploadFile(filePath)

        // Three ways to wait for the upload to finish — worst to best:

        // 1. Hard-coded sleep (avoid): always waits the full duration even when the page
        //    is ready sooner, and still flakes if it isn't ready in time.
        // await page.waitForTimeout(15000)

        // 2. Wait for a condition: pauses only until the element reaches the given state,
        //    then continues immediately.
        // await upload.successText.waitFor({ state: 'visible', timeout: 15000 })

        // 3. Web-first assertion (preferred): auto-retries until it passes or the timeout
        //    is hit, so the wait and the check are one step (used below). Note the timeout
        //    goes on the matcher, not on expect(): expect(locator).toMatcher(value, { timeout }).

        // verify the plugin's success message, e.g. "File 5MB_sample_file.pdf uploaded successfully"
        // 30s budget: the live site's upload speed for a 5MB file can vary
        await expect(upload.successText)
            .toContainText('uploaded successfully', { timeout: 30000 })
    })
})
