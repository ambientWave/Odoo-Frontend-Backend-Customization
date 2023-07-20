odoo.define('pos_custom_buttons.CustomTicketButtons', function(require) {
'use strict';
   const { Gui } = require('point_of_sale.Gui');
   const PosComponent = require('point_of_sale.PosComponent');
   const { posbus } = require('point_of_sale.utils');
   const ProductScreen = require('point_of_sale.ProductScreen');
   const { useListener } = require('web.custom_hooks');
   const Registries = require('point_of_sale.Registries');
   class CustomTicketButtons extends PosComponent {
//       onClick() {
//                Gui.showPopup("ErrorPopup", {
//                       title: this.env._t('Custom Ticket Button Clicked'),
//                       body: this.env._t('Welcome to OWL'),
//                   });
//       }

       onClick() {
                Gui.showPopup("CurrencyExRatesPopup", {
//                       title: this.env._t('Custom Ticket Button Clicked'),
//                       body: this.env._t('Welcome to OWL'),
                   });
       }
   }
    CustomTicketButtons.template = 'CustomTicketButtons';
   Registries.Component.add(CustomTicketButtons);
   return CustomTicketButtons;
});