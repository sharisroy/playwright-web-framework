import {Page, Locator} from '@playwright/test'

class HomePage {
    readonly page: Page
    readonly getStartedBtn: Locator
    readonly heading: Locator
    readonly homeLink: Locator
    readonly searchIcon: Locator
    readonly navLinks: Locator

    constructor(page: Page) {
        this.page = page
        this.getStartedBtn = page.locator('#get-started')
        this.heading = page.locator('text=Think different. Make different.')
        this.homeLink = page.locator('#zak-primary-menu >> text=Home')
        this.searchIcon = page.locator("//div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']")
        this.navLinks = page.locator('#zak-primary-menu li[id*=menu]')
    }

    async navigate(path = '/') {
        await this.page.goto(path)
    }

    getNavLinksText() {
        return this.navLinks.allInnerTexts()
    }
}

export default HomePage
