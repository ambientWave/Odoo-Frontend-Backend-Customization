odoo.define('custom_restaurant.currencyExButton', function(require) {
'use strict';
   const { Gui } = require('point_of_sale.Gui');
   const PosComponent = require('point_of_sale.PosComponent');
   const { posbus } = require('point_of_sale.utils');
   const ProductScreen = require('point_of_sale.ProductScreen');
   const { useListener } = require('web.custom_hooks');
   const { useState } = owl.hooks;
   const Registries = require('point_of_sale.Registries');
   const PaymentScreen = require('point_of_sale.PaymentScreen');
   class currencyExRateButton extends PosComponent {
       constructor() {
           super(...arguments);
           this.state = useState({
          myAPI: "Please close and click the button again",
        });
           useListener('click', this.onClick);
       }
       is_available() {
           const order = this.env.pos.get_order();
           console.log(order);
           return order
       };
//       let Obj2 = {};

       onClick() {let self = this;
       async function refreshServerInfo() {

                      const response = await fetch("https://open.er-api.com/v6/latest/EGP");
                      const Obj = await response.json();
                      console.log(Obj);
                      Object.keys(Obj).forEach(p => console.log(`${p}:${Obj[p]}`));
//                        Obj2 = Obj;
                      return Obj;
                };
                refreshServerInfo().then((Obj) => {Object.assign(self.state, { myAPI: `One Egyptian Pound =${JSON.stringify(Obj.rates.USD)} US Dollar`});
                console.log(`paiiion ${self.state.myAPI}`);});
console.log(`paiiion2 ${self.state.myAPI}`);
//                     refreshServerInfo().then((res) => Object.keys(res).forEach(p => console.log(`22${p}:${res[p]}`)));
//                    console.log(`has:${currencyExAPIObj}`);
//console.log(`myskhd::::${Obj2}`);
                Gui.showPopup("ConfirmPopup", {
                        confirmText: this.env._t("Exit"),
                       title: this.env._t('Payment Screen Custom Button Clicked'),
                       body: this.env._t(self.state.myAPI)
                   });


        }
   }
currencyExRateButton.template = 'currencyExButton';


   ProductScreen.addControlButton({
       component: currencyExRateButton,
       condition: function() {
           return this.env.pos;
       },
   });
   Registries.Component.add(currencyExRateButton);
   return currencyExRateButton;
});