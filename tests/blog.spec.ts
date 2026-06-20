import {test, expect} from '@playwright/test'
import BlogPage from '../pages/blog.page'

test.describe('Blog', () => {
    let blog: BlogPage

    test.beforeEach(async ({page}) => {
        blog = new BlogPage(page)
        await blog.navigate()
    })

    test('Verify the recent posts count and each title length', async () => {
        // assert there are exactly 5 recent posts
        expect(await blog.getRecentPostCount()).toEqual(5)

        // assert every post title is longer than 10 characters
        for (const title of await blog.getRecentPostTexts()) {
            expect(title.trim().length).toBeGreaterThan(10)
        }
    })
})
