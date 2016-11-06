/**
 * Plugin Name: Cart Products
 * Type plugin: single page application
 * Author: Orischenko Alexander
 */

'use strict';

class PageCatalogue{
    constructor(options) {
        let template = document.getElementById('product-catalogue-template').innerHTML;

        this._compiledTemplate = _.template(template);

        this._el = options.element;

        this._render(options.products);

        this._el.addEventListener('click', this._onPoductLinkClick.bind(this));
    }

    _onPoductLinkClick(event) {
        if(!event.target.closest('[data-element="productAddToCart"]')) return;

        event.preventDefault();

        let productContainer = event.target.closest('[data-element="productContainer"]');

        let customEvent = new CustomEvent('productSelected', {
            detail: {
                id: productContainer.dataset.productId
            }
        });

        this._el.dispatchEvent(customEvent);
    }

    _render(products) {
        this._el.innerHTML = this._compiledTemplate({
            products: products
        });
    }

    _show() {
        this._el.classList.remove('js-hidden');
    }

    _hide() {
        this._el.classList.add('js-hidden');
    }

    _getElement() {
        return this._el;
    }
}