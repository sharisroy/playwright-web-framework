import {test, expect} from "@playwright/test"

test.describe("Home", () => {
    test("Open the Homepage and shows the correct title", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com")

        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns")
    })

    test("Open the About and shows the correct title", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com/about")

        await expect(page).toHaveTitle("About – Practice E-Commerce Site")
    })

    test("Click Get Started button with CSS Selector", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com")

        await page.locator('#get-started').click();
        await expect(page).toHaveURL(/.*#get-started/)
    })

    test("Verify heading text is visible using text selector", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com")

        const headingText = await page.locator('text=Think different. Make different.')
        await expect(headingText).toBeVisible();
        await expect(headingText).not.toBeHidden();
    })

    test("Verify Home link is visible using text and css selector", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com")

        // the Home link inside the primary menu (#zak-primary-menu >> text=Home)
        const homeLink = page.locator('#zak-primary-menu >> text=Home')
        await expect(homeLink).toBeVisible()
    })

    test("Verify text of all nav links", async ({page}) => {
        await page.goto("https://practice.sdetunicorns.com")

        const expectedLinks = ["Home", "About", "Shop", "Blog", "Contact", "My account"]

        // toHaveText with an array asserts both the count and the text of each link, in order
        const navLinks = page.locator('#zak-primary-menu li[id*=menu]')
        await expect(navLinks).toHaveText(expectedLinks)
    })
})