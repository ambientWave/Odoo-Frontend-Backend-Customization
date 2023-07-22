odoo.define('custom_restaurant.DiscountAccess', function(require) {
    'use strict';

    
    // const PosComponent = require('point_of_sale.PosComponent');
    // const ProductScreen = require('point_of_sale.ProductScreen');
    // const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    const NumberBuffer = require('point_of_sale.NumberBuffer')
    // const { Gui } = require('point_of_sale.Gui');
    const disBttn = require('pos_discount.DiscountButton');
    const session = require('web.session');
    const core = require('web.core');
    const _t = core._t;
    
    const myDiscountButton = (disBttn) =>
    class extends disBttn {

        async onClick() {
            var self = this;
            NumberBuffer.reset();
            var userInput = await this.showPopup("NumberPopup", {
                isPassword:true,
                'title':_t("Enter Password")
            });

            if(userInput['payload'] === this.env.pos.config.discount_passcode) {
                NumberBuffer.reset();
                var {confirmed, payload} = await this.showPopup("NumberPopup", {
                'title':_t("Discount Percentage")
            });

            if(confirmed) {
                self.apply_discount();
            }

            } else {
                await this.showPopup("ErrorPopup", {
                'title':_t("Error"),
                'body': _t("wrong password")
            });
            }
        }

        // async onClick() {
        //     var self = this;
        //     session.user_has_group('custom_restaurant.pos_discount_group').then(
        //         async function(hasGroup) {
        //             if(hasGroup) {
        //                 // return self._super();
        //                 console.log("yes");

        //             } else {
        //                 console.log("no");
        //                 await this.showPopup('ErrorPopup', {
        //                     'title': _t('Discount restricted')
        //                 })

        //             }
        //         }
        //     )
        // }


    }

    Registries.Component.extend(disBttn, myDiscountButton);

    return myDiscountButton;
    });