import { test, expect } from '@playwright/test'
import { credentials } from '../config/credentials'

test.describe('My Account', () => {
  test('Login', async ({ page }) => {
    await page.goto('/my-account')
    await page.locator('#username').fill(credentials.username)
    await page.locator('#password').fill(credentials.password)
    await page.locator('[value="Log in"]').click()
    await expect(page.getByRole('link', { name: /log out/i }).first()).toBeVisible()
  })

  test.describe('authenticated', () => {
    // Orders/Downloads are only reachable when logged in, and each test gets a fresh
    // context — so log in before each one.
    test.beforeEach(async ({ page }) => {
      await page.goto('/my-account')
      await page.locator('#username').fill(credentials.username)
      await page.locator('#password').fill(credentials.password)
      await page.locator('[value="Log in"]').click()
      await expect(page.getByRole('link', { name: /log out/i }).first()).toBeVisible()
    })

    test('Access Orders', async ({ page }) => {
      await page.locator(`li a[href*='orders']`).click()
      await expect(page).toHaveURL(/.*orders/)
    })

    test('Access Downloads', async ({ page }) => {
      await page.locator(`li a[href*='downloads']`).click()
      await expect(page).toHaveURL(/.*downloads/)
    })
  })
})
