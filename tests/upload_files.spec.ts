import {test, expect} from '@playwright/test'
import path from 'path'
import UploadComponent from '../pages/component/upload.component'

test.describe('Upload File', () => {
    let upload: UploadComponent

    test.beforeEach(async ({page}) => {
        upload = new UploadComponent(page)
        // open the cart page, which hosts the file upload form
        await page.goto('/cart')
    })

    test('Should upload a file and verify the success message', async () => {
        // resolve the path to the test image: <project>/test-data/test_image.png
        const filePath = path.join(__dirname, '../test-data/test_image.png')

        // the component handles select-file + enable-button + click
        await upload.uploadFile(filePath)

        // verify the plugin's success message, e.g. "File test_image.png uploaded successfully"
        await expect(upload.successText).toContainText('uploaded successfully', { timeout: 15000 })
    })

    test('Should upload a file on hidden input field and verify the success message', async ({page}) => {
        // resolve the path to the test image: <project>/test-data/test_image.png
        const filePath = path.join(__dirname, '../test-data/test_image.png')

        // alternative to the component's enable step: un-hide the input so the plugin
        // enables the upload button itself
        await page.evaluate(() => {
            const input = document.querySelector('input#upfile_1')
            if (input) input.className = ''
        })

        await upload.uploadInput.setInputFiles(filePath)
        await upload.submitBtn.click()

        // verify the plugin's success message, e.g. "File test_image.png uploaded successfully"
        await expect(upload.successText).toContainText('uploaded successfully', { timeout: 15000 })
    })
})
