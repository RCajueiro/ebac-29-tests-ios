import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page.js'
import browsePage from '../pageobjects/browse.page.js'
import productPage from '../pageobjects/product.page.js'

describe('Product Details', () => {
    it('should view product info', async () => {
        await homePage.search()
        await browsePage.searchInput.setValue('Tênis Esportivo')
        await (await browsePage.products).at(0).click()
        expect(productPage.getProductTitle('Tênis Esportivo')).toBeDisplayed()
    })
})

