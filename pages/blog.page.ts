import {Page, Locator} from '@playwright/test'
import BasePage from './base.page'

class BlogPage extends BasePage {
    readonly recentPosts: Locator

    constructor(page: Page) {
        super(page)
        this.recentPosts = page.locator('#recent-posts-3 ul li')
    }

    async navigate() {
        await super.navigate('/blog')
    }

    getRecentPostCount() {
        return this.recentPosts.count()
    }

    getRecentPostTexts() {
        return this.recentPosts.allTextContents()
    }
}

export default BlogPage
