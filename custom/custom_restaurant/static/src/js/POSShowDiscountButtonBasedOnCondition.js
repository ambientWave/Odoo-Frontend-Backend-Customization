odoo.define('custom_restaurant.POSShowDiscountButtonBasedOnCondition', function(require) {
    'use strict';

       const ProductScreen = require('point_of_sale.ProductScreen');
       const DiscountButton = require('pos_discount.DiscountButton');

        console.log(ProductScreen);
        // console.log(this.env.pos); //this line causes an error because at this point we don't extends a class or called any super function with properties like env
        ProductScreen.addControlButton({
            component: DiscountButton,
            condition: function() {
                var cashierObject = this.env.pos.get('cashier') || this.env.pos.get_cashier();
                let has_discount = true;

                if(cashierObject.user_id[0] !== 2) {
                    has_discount = false;
                }
                
                return this.env.pos.config.module_pos_discount && this.env.pos.config.discount_product_id && has_discount;
           }, position: ['replace', 'DiscountButton']});

    });