import {Page} from '@playwright/test'

abstract class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate(path = '/') {
        await this.page.goto(path)
    }
}

export default BasePage
