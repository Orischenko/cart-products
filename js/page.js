/**
 * Plugin Name: Cart Products
 * Type plugin: single page application
 * Author: Orischenko Alexander
 */

'use strict';

let defaultProducts = [
    {
        "age": 0,
        "id": "spencer-loveseat-charcoal-gray-v1",
        "imageUrl": "img/products/spencer-loveseat-charcoal-gray-v1.jpg",
        "name": "Spencer Loveseat Charcoal Gray",
        "snippet": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "description": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "price": "45"
    },
    {
        "age": 1,
        "id": "vitra-miniature-collection-butterfly-stool-v1",
        "imageUrl": "img/products/vitra-miniature-collection-butterfly-stool-v1.jpg",
        "name": "Vitra Miniature Collection Butterfly Stool",
        "snippet": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "description": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "price": "56"
    },
    {
        "age": 2,
        "id": "beehive-love-seat-black-v1",
        "imageUrl": "img/products/beehive-love-seat-black-v1.jpg",
        "name": "Beehive Love Seat Black",
        "snippet": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "description": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "price": "73"
    },
    {
        "age": 3,
        "id": "tuscany-hutch-in-noceto-v1",
        "imageUrl": "img/products/tuscany-hutch-in-noceto-v1.jpg",
        "name": "Tuscany Hutch in Noceto",
        "snippet": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "description": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "price": "120"
    },
    {
        "age": 4,
        "id": "hans-wegner-shell-chair-ch07-v1",
        "imageUrl": "img/products/hans-wegner-shell-chair-ch07-v1.jpg",
        "name": "Hans Wegner Shell Chair CH07",
        "snippet": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "description": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "price": "80"
    },
    {
        "age": 5,
        "id": "garton-living-room-set-in-chocolate-v1",
        "imageUrl": "img/products/garton-living-room-set-in-chocolate-v1.jpg",
        "name": "Darton Living Room Set in Chocolate",
        "snippet": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "description": "We’ve created the coziest online furniture store. If you are looking for a single item or are planning to furnish a several-store place",
        "price": "230"
    }
];


class PageController{
    constructor(options) {
        this._el = options.element;

        this._catalogue = new PageCatalogue({
            element: this._el.querySelector('[data-component="productCatalogue"]'),
            products: defaultProducts
        });

        this._cart = new PageCart({
            element: this._el.querySelector('[data-component="cart"]')
        });

        this._viewer = new Viewer({
            element: this._el.querySelector('[data-component="cartViewer"]')
        });

        this._viewer._hide();

        this._single = new Single({
            element: this._el.querySelector('[data-component="productSingle"]')
        });

        this._single._hide();

        this._catalogue._getElement().addEventListener('productSelected', this._onProductSelected.bind(this));

        this._cart._getElement().addEventListener('viewCart', (event) => {
            this._catalogue._hide();
            this._viewer._show();
        });
    }

    _onProductSelected(event) {
        let productId = event.detail.id;

        let productDetails = this._getProductById(productId);

        //Если продукт уже есть в корзине
        let elems = Array.prototype.slice.call(this._cart._getProductsCartContainer()),
        cartItems = [];

        elems.filter((item) => {
            cartItems.push(item.dataset.productId);

            if(item.dataset.productId === productId) {
                let quantity = item.querySelector('[data-element="quantity"]'),
                    total = item.parentElement.parentElement.querySelector('[data-element="total"]'),
                    price = item.querySelector('[data-element="price"]');

                quantity.innerText++;
                total.innerText = Number(total.innerText) + ( (Number(price.innerText) * Number(quantity.innerText)) / Number(quantity.innerText) );
            }
        });

        if (cartItems.indexOf(productId) !== -1) {
            //Если продукт уже есть в корзине
            return;
        }

        //Если продукта ещё нет в корзине
        this._cart._render(productDetails);
        this._viewer._render(productDetails);
    }

    _getProductById(productId) {
        return defaultProducts.filter((product) => {
            return product.id === productId;
        })[0];
    }
}