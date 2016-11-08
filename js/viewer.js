/**
 * Plugin Name: Cart Products
 * Type plugin: single page application
 * Author: Orischenko Alexander
 */

'use strict';

class Viewer{
    constructor(options) {
        let template = document.getElementById('product-viewer-template').innerHTML;

        this._compiledTemplate = _.template(template);

        this._el = options.element;
    }

    _show() {
        this._el.classList.remove('js-hidden');
    }

    _hide() {
        this._el.classList.add('js-hidden');
    }

    _render(product) {
        this._el.innerHTML += this._compiledTemplate({
            product: product
        });

        //this._price().innerText = this._setPrice();
    }
}