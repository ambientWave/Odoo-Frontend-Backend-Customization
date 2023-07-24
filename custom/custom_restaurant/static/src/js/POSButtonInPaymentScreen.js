odoo.define('custom_restaurant.POSButtonInPaymentScreen', function(require) {
    'use strict';
       const { Gui } = require('point_of_sale.Gui');
       const PaymentScreen = require('point_of_sale.PaymentScreen');
       const { useListener } = require('web.custom_hooks');
       const Registries = require('point_of_sale.Registries');

       const POSButtonInPaymentScreen = (PaymentScreen) =>
       class extends PaymentScreen {
        // constructor() {
        //     super(...arguments);
        //     useListener('click', this.onClick)
        // } // why we need to enclose the class like this in a variable whenever we extend something (not add)?
        // if we try to use regular class defintion, the pos fails to load

    
           onClick() {
                    console.log('1');
                    console.log(this.env); //this is a very important object
                    /* Object { _t: fcnt(str), browser: {…}, bus: {…}, device: {…}, isDebug: isDebug(debugMode), qweb: {…}, services: {…}, session: {…}, dataManager: {…}, isMobile: false, … }
​
_t: function fcnt(str)
​
browser: Object { clearInterval: BoundFunctionObject, clearTimeout: BoundFunctionObject, Date: Date(), … }
​
bus: Object { subscriptions: {…} }
​
dataManager: Object { _super: null, _cache: {…} }
​
device: Object { touch: false, size_class: 6, isAndroid: false, … }
​
isDebug: function isDebug(debugMode)
​
isMobile: false
​
pos: Object { cid: "c3", _changing: false, _pending: false, … }
​
qweb: Object { subscriptions: {…}, h: h(sel, b, c), isUpdating: false, … }
​
services: Object { ajaxJsonRPC: ajaxJsonRPC(), getCookie: getCookie(), httpRequest: httpRequest(route, params, readMethod), … }
​
session: Object { __parentedDestroyed: false, server: "http://127.0.0.1:8069", avoid_recursion: false, … }
​
<prototype>: Object { … }
point_of_sale.assets.js:1869:399
 */
                    console.log('2');
                    console.log(this.env._t);
                    console.log('3');
                    console.log(this.env.pos);
                    console.log('4');
                    console.log(this.env.pos.get_cashier());
                    console.log('5');
                    console.log(this.env.pos.get_cashier().user_id);
                    Gui.showPopup("ConfirmPopup", {
                          title: this.env._t('Custom Payment Button Clicked'),
                          body: this.env.pos.get_cashier().user_id[1],
                       });
           }

         //   ProductScreen.addControlButton({
         //    component: POSButtonInPaymentScreen,
         //    condition: function() { // this is a very important property. If we desire that to show the component in condition of something, then we put it. here we simply return an object that will always be true
         //       return this.env.pos;
         //    }
         //   })

       }
    //    we are commenting out the template because we are modifying an existing one not adding new one
    //    POSButtonInPaymentScreen.template = 'CustomTicketButtons';
       Registries.Component.extend(PaymentScreen, POSButtonInPaymentScreen);
       return POSButtonInPaymentScreen;
    });