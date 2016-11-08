/**
 * Plugin Name: Cart Products
 * Type plugin: single page application
 * Author: Orischenko Alexander
 */

'use strict';

class Single{
    constructor(options) {
        this._el = options.element;
    }

    _show() {
        this._el.classList.remove('js-hidden');
    }

    _hide() {
        this._el.classList.add('js-hidden');
    }
}