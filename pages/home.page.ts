import {Page, Locator} from '@playwright/test'
import BasePage from './base.page'

class HomePage extends BasePage {
    readonly getStartedBtn: Locator
    readonly heading: Locator
    readonly homeLink: Locator
    readonly searchIcon: Locator
    readonly navLinks: Locator

    constructor(page: Page) {
        super(page)
        this.getStartedBtn = page.locator('#get-started')
        this.heading = page.locator('text=Think different. Make different.')
        this.homeLink = page.locator('#zak-primary-menu >> text=Home')
        this.searchIcon = page.locator("//div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']")
        this.navLinks = page.locator('#zak-primary-menu li[id*=menu]')
    }

    getNavLinksText() {
        return this.navLinks.allInnerTexts()
    }
}

export default HomePage
