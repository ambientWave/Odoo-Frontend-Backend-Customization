odoo.define('pos_Coupons.CurrencyExRatesPopup', function(require) {
   'use strict';
   const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
   const Registries = require('point_of_sale.Registries');
   const PosComponent = require('point_of_sale.PosComponent');
   const ControlButtonsMixin = require('point_of_sale.ControlButtonsMixin');
   const NumberBuffer = require('point_of_sale.NumberBuffer');
   const { useListener } = require('web.custom_hooks');
   const { onChangeOrder, useBarcodeReader } = require('point_of_sale.custom_hooks');
   const { useState } = owl.hooks;
   class CurrencyExRatesPopup extends AbstractAwaitablePopup {
    constructor() {
    super(...arguments);
    this.state = useState({
          inputAPI: "Please close and click the button again",
          outputAPI: "",
          outputAPICurrencyStr: ""
        });
    useListener('click', "#display-rate-button", this.fetch);
       }

       fetch() {let self = this;
       async function refreshServerInfo() {

                      const response = await fetch("https://open.er-api.com/v6/latest/EGP");
                      const Obj = await response.json();
                      console.log(self.state);
                      console.log(Obj);
                      Object.keys(Obj).forEach(p => console.log(`${p}:${Obj[p]}`));
//                        Obj2 = Obj;
                      return Obj;
                };
        switch(self.state.inputAPI) {
            case ("USD"):
                self.state.outputAPICurrencyStr = "US Dollar";
                break;
            case ("EUR"):
                self.state.outputAPICurrencyStr = "European Euro";
                break;
    }
                refreshServerInfo().then((Obj) => {Object.assign(self.state, { outputAPI: `One Egyptian Pound = ${Obj.rates[self.state.inputAPI]} ${self.state.outputAPICurrencyStr}`});
                console.log(`paiiin1 ${self.state.inputAPI}`);
                console.log(`paiiin2 ${self.state.outputAPI}`);});
console.log(`paiiin3 ${self.state.inputAPI}`);


        }
    }

    //Create products popup
   CurrencyExRatesPopup.template = 'CurrencyExRatesPopup';
   CurrencyExRatesPopup.defaultProps = {
       confirmText: 'Ok',
       cancelText: 'Cancel',
       title: 'Currency Exchange Rates',
       body: '',
   };
   Registries.Component.add(CurrencyExRatesPopup);
   return CurrencyExRatesPopup;
});