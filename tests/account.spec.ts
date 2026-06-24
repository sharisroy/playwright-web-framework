import { test, expect } from '@playwright/test'
import { credentials } from '../config/credentials'
import AccountPage from '../pages/account.page'

test.describe('My Account', () => {
  test('Login', async ({ page }) => {
    const account = new AccountPage(page)
    await account.navigate()
    await account.login(credentials.username, credentials.password)
    await expect(account.logoutLink).toBeVisible()
  })

  test.describe('authenticated', () => {
    let account: AccountPage

    // Orders/Downloads are only reachable when logged in, and each test gets a fresh
    // context — so log in before each one.
    test.beforeEach(async ({ page }) => {
      account = new AccountPage(page)
      await account.navigate()
      await account.login(credentials.username, credentials.password)
      await expect(account.logoutLink).toBeVisible()
    })

    test('Access Orders', async ({ page }) => {
      await account.goToOrders()
      await expect(page).toHaveURL(/.*orders/)
    })

    test('Access Downloads', async ({ page }) => {
      await account.goToDownloads()
      await expect(page).toHaveURL(/.*downloads/)
    })
  })
})
