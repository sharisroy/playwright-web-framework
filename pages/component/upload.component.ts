import { Page, Locator } from "@playwright/test";

class UploadComponent {
    readonly page: Page;
    readonly uploadInput: Locator;
    readonly submitBtn: Locator;
    readonly successText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadInput = page.locator('input#upfile_1');
        this.submitBtn = page.locator('#upload_1');
        this.successText = page.locator('#wfu_messageblock_header_1_1');
    }

    async uploadFile(filePath: string) {
        await this.uploadInput.setInputFiles(filePath);
        // the plugin keeps the submit button disabled for a programmatically selected
        // file, so enable it ourselves before clicking to trigger the upload
        await this.submitBtn.evaluate(el => { (el as HTMLInputElement).disabled = false; });
        await this.submitBtn.click();
    }
}

export default UploadComponent;
