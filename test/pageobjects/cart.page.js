import { $ } from '@wdio/globals'

class CartPage {
    get addToCart() {
        return $(`-ios predicate string:name == "addToCart"`)
    }

    get payment() {
        return $(`-ios predicate string:name == "selectAddressOrContinueToPayment"`)
    }

    get checkout() {
        return $(`-ios predicate string:name == "completeCheckout"`)
    }
}

export default new CartPage()