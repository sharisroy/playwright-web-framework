import { Page } from "@playwright/test";

class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}

export default CartPage;