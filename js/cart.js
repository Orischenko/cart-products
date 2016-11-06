/**
 * Plugin Name: Cart Products
 * Type plugin: single page application
 * Author: Orischenko Alexander
 */

'use strict';

class PageCart{
    constructor(options) {
        let template = document.getElementById('product-cart-template').innerHTML;

        this._compiledTemplate = _.template(template);

        this._el = options.element;


    }

    _show() {
        this._el.classList.remove('js-hidden');
    }

    _hide() {
        this._el.classList.add('js-hidden');
    }

    _price() {
        let price = this._el.querySelector('[data-element="total"]');

        return price;
    }

    _setPrice() {
        let cartItem = this._el.querySelectorAll('[data-element="itemPrice"]'),
            elems = Array.prototype.slice.call(cartItem),
            priceArray = [],
            result = '';

        elems.forEach(function(item){
            priceArray.push(item.querySelector('[data-element="quantity"]').innerText * item.querySelector('[data-element="price"]').innerText);
        });

        function sum(a, b) {
            let num1 = Number(a);
            let num2 = Number(b);
            return Number(a) + Number(b);
        }

        result = priceArray.reduce(sum);

        return result;
    }

    _render(product) {
        this._el.innerHTML += this._compiledTemplate({
            product: product
        });

        this._price().innerText = this._setPrice();
    }

    _getElement() {
        return this._el;
    }
}