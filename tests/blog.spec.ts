import {test, expect} from '@playwright/test'
import BlogPage from '../pages/blog.page'

test.describe('Blog', () => {
    test('Verify the recent posts count and each title length', async ({page}) => {
        const blog = new BlogPage(page)
        await blog.navigate()

        // assert there are exactly 5 recent posts
        expect(await blog.getRecentPostCount()).toEqual(5)

        // assert every post title is longer than 10 characters
        for (const title of await blog.getRecentPostTexts()) {
            expect(title.trim().length).toBeGreaterThan(10)
        }
    })
})
