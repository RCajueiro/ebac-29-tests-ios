import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page.js'
import browsePage from '../pageobjects/browse.page.js'
import productPage from '../pageobjects/product.page.js'
import cartPage from '../pageobjects/cart.page.js'
import loginPage from '../pageobjects/login.page.js'
import profilePage from '../pageobjects/profile.page.js'

describe('My full checkout', () => {
    
    it('should login with valid credentials', async () => {
        let profileTab = driver.isAndroid ? 'profile' : 'Account'
        await homePage.openMenu(profileTab)
        await loginPage.login('cliente@ebac.art.br', 'GD*peToHNJ1#c$sgk08EaYJQ')
        await homePage.openMenu(profileTab)
        expect((await profilePage.profileName('EBAC Cliente')).isDisplayed()).toBeTruthy()
    })

    it('should view product info', async () => {
        await homePage.openMenu('Browse')
        await homePage.search()
        await browsePage.searchInput.setValue('Tênis Esportivo')
        await (await browsePage.products).at(3).click({force: true})
        await (await browsePage.products).at(3).click({force: true})
        expect(productPage.getProductTitle('Tênis Esportivo')).toBeDisplayed()
    })

    it('should add product to cart and finish transaction', async () => {
        await cartPage.addToCart.click()
        await cartPage.payment.click()
        await cartPage.checkout.click()
        await expect($(`-ios predicate string:name == "Order Success"`)).toBeDisplayed()
    })
})