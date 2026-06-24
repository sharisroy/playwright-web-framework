import {Page, Locator} from '@playwright/test'
import BasePage from './base.page'

class AccountPage extends BasePage {
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginBtn: Locator
    readonly logoutLink: Locator
    readonly ordersLink: Locator
    readonly downloadsLink: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.loginBtn = page.locator('[value="Log in"]')
        this.logoutLink = page.getByRole('link', {name: /log out/i}).first()
        this.ordersLink = page.locator(`li a[href*='orders']`)
        this.downloadsLink = page.locator(`li a[href*='downloads']`)
    }

    async navigate() {
        await super.navigate('/my-account')
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginBtn.click()
    }

    async goToOrders() {
        await this.ordersLink.click()
    }

    async goToDownloads() {
        await this.downloadsLink.click()
    }
}

export default AccountPage
