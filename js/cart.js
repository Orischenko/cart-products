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

        this._el.addEventListener('click', this._removeItem.bind(this));

        this._el.addEventListener('click', (event) => {
            if(!event.target.closest('[data-component="cart"]')) return;

            event.target.classList.toggle("open");
        });

        this._el.addEventListener('click', (event) => {
            if(!event.target.closest('[data-element="viewCart"]')) return;

            event.preventDefault();

            this._el.classList.remove('open');

            let customEvent = new CustomEvent('viewCart');

            this._el.dispatchEvent(customEvent);
        });
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
            let quantity = item.querySelector('[data-element="quantity"]'),
                price = item.querySelector('[data-element="price"]');

            priceArray.push(quantity.innerText * price.innerText);
        });

        function sum(a, b) {
            return Number(a) + Number(b);
        }

        result = priceArray.reduce(sum);

        return result;
    }

    _render(product) {
        this._el.querySelector('[data-element="cartProductRender"]').innerHTML += this._compiledTemplate({
            product: product
        });

        this._price().innerText = this._setPrice();
    }

    _removeItem() {
        if (event.target.closest('[data-element="removeButton"]')) {

            let total = event.target.parentElement.parentElement.parentElement.querySelector('[data-element="total"]'),
                quantity = event.target.parentElement.querySelector('[data-element="quantity"]'),
                price = event.target.parentElement.querySelector('[data-element="price"]');

            total.innerText = total.innerText - quantity.innerText * price.innerText;

            event.target.parentElement.removeAttribute('data-product-id');
            event.target.parentElement.innerHTML = '';
        }
    }

    _getProductsCartContainer() {
        return this._el.querySelectorAll('[data-element="productCartContainer"]');
    }

    _getElement() {
        return this._el;
    }
}