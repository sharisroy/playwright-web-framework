import {test, expect} from '@playwright/test'

test.describe('Blog', () => {
    test('Verify the recent posts count and each title length', async ({page}) => {
        await page.goto('https://practice.sdetunicorns.com/blog')

        const recentPostList = page.locator('#recent-posts-3 ul li')

        // assert there are exactly 5 recent posts
        expect(await recentPostList.count()).toEqual(5)

        // assert every post title is longer than 10 characters
        for (const title of await recentPostList.allTextContents()) {
            expect(title.trim().length).toBeGreaterThan(10)
        }
    })
})
