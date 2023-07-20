odoo.define('custom_restaurant.callAPI', function (require) {
"use strict";
var models = require('point_of_sale.models');
console.log(models);
//    models.load_models([
//
//    {
//
//    model: 'custom_restaurant.combined_menu_item',
//
//    condition: function(self){ return true; },
//
//    fields: ['item_name','item_price'],
//
//    domain: function(self){ return [['active','=',true]]; },
//
//    loaded: function(self,result){
//
//    if(result.length){
//
//    # do operation as you like, here setting the value in a variable
//
//    self.set('variable',result[0].item_name);
//
//    }
//
//    },
//
//    }],{'after': 'product.product'});

});