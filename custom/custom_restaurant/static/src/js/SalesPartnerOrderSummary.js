// /** @odoo-module **/

// const { Component } = owl;
// const { useState } = owl.hooks;
// var FormRenderer = require('web.FormRenderer');
// const { ComponentWrapper } = require('web.OwlCompatibility');
// // console.log("A");
// class SalesPartnerOrderSummary extends Component {
//     partner = useState({});
//     constructor(self, partner) {
//         super();
//         this.partner = partner;
//     }
// };

// Object.assign(SalesPartnerOrderSummary, {
//     template: "SalesPartnerOrderSummary"
// });
// // console.log("C");
// FormRenderer.include({
    
//     async _renderView() {
//         await this._super(...arguments);
//         for(let element of this.el.querySelectorAll(".o_partner_order_summary")) {
//             // console.log(this);
//             // console.log(self);
//             // console.log(this.el);
//             // console.log(this.env)
//             // console.log(this.state);
// console.log("C");
//             this._rpc({
//                 model: "res.partner",
//                 method: "read",
//                 args: [[this.state.data.partner_id.res_id]]
//             }).then(data => {
//                 (new ComponentWrapper(this, SalesPartnerOrderSummary, useState(data[0]))
                
//                 ).mount(element)
// console.log("C");
//                 // console.log(`2${this.element}`);
//                 // console.log(`2${element}`);
//                 // console.log(`2${databaseResponse}`);
//                 // console.log(`2${this.env}`);
//                 // console.log(`2${this.state}`);
//             })

//         }


//     }
// });




odoo.define('custom_restaurant.SalesPartnerOrderSummary', function(require) {
    'use strict';
    //    const Registries = require('point_of_sale.Registries');
       const {Component} = owl;
       const {useState} = owl.hooks;
       const FormRenderer = require("web.FormRenderer");
       const {ComponentWrapper} = require("web.OwlCompatibility");
       console.log("a")
       class SalesPartnerOrderSummary extends Component {
           partner = useState({});
           constructor(self, partner) {
               super();
               this.partner = partner;
           }
           
       };
       
    //    Object.assign(SalesPartnerOrderSummary, {
    //        template: "custom_restaurant.SalesPartnerOrderSummary"
    //    });
       
       FormRenderer.include({
           async _renderView() {
               await this._super(...arguments);
               for(const element of this.el.querySelectorAll(".o_partner_order_summary")) {
                   console.log(this);
                   console.log(self);
                   console.log(this.el);
                   console.log(this.env)
                   console.log(this.state); //this is an important object
       
                   this._rpc({
                       model: "res.partner",
                       method: "read",
                       args: [[this.state.data.partner_id.res_id]]
                   }).then(data => {
                       (new ComponentWrapper(this, SalesPartnerOrderSummary, useState(data[0]))
                       
                       ).mount(element);

                       console.log('11');
                       console.log(this.element);
                       console.log('22');
                       console.log(element);
                       console.log('33');
                       console.log(data); //this is an important object
                       console.log('44');
                       console.log(this.env);
                       console.log('55');
                       console.log(this.state);
                   });
       
               }
       
       
           }
       });

    

       
        SalesPartnerOrderSummary.template = 'SalesPartnerOrderSummary';
    //    Registries.Component.add(SalesPartnerOrderSummary);
       return SalesPartnerOrderSummary;
    });