import {Page, Locator} from '@playwright/test'

class BlogPage {
    readonly page: Page
    readonly recentPosts: Locator

    constructor(page: Page) {
        this.page = page
        this.recentPosts = page.locator('#recent-posts-3 ul li')
    }

    async navigate() {
        await this.page.goto('https://practice.sdetunicorns.com/blog')
    }

    getRecentPostCount() {
        return this.recentPosts.count()
    }

    getRecentPostTexts() {
        return this.recentPosts.allTextContents()
    }
}

export default BlogPage
