import HomePage from "../pages/home.page"
import {test, expect} from "@playwright/test"

test.describe("Home", () => {
    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    test("Open the Homepage and shows the correct title", async ({page}) => {
        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns")
    })

    test("Open the About and shows the correct title", async ({page}) => {
        await homePage.navigate('/about')

        await expect(page).toHaveTitle("About – Practice E-Commerce Site")
    })

    test("Click Get Started button with CSS Selector", async ({page}) => {
        await homePage.getStartedBtn.click()
        await expect(page).toHaveURL(/.*#get-started/)
    })

    test("Verify heading text is visible using text selector", async ({page}) => {
        const headingText = page.locator('text=Think different. Make different.')
        await expect(headingText).toBeVisible();
        await expect(headingText).not.toBeHidden()
    })

    test("Verify Home link is visible using text and css selector", async ({page}) => {
        // the Home link inside the primary menu (#zak-primary-menu >> text=Home)
        const homeLink = page.locator('#zak-primary-menu >> text=Home')
        await expect(homeLink).toBeVisible()
    })

    test("Verify text of all nav links", async () => {
        const expectedLinks = ["Home", "About", "Shop", "Blog", "Contact", "My account"]

        // getNavLinksText() returns the link texts as a string[], so compare with toEqual
        expect(await homePage.getNavLinksText()).toEqual(expectedLinks)
    })
})