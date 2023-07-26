odoo.define('custom_restaurant.HideActionButton', function (require) {
    "use strict";
    var session = require('web.session');
    var BasicView = require('web.BasicView');

    BasicView.include({
        init: function(ViewInfo, params) {
            var self = this;
            this._super.apply(this, arguments);

            var currentModel = self.controllerParams.modelName;
            var affectedModels = ['product.template'];

            if(affectedModels.includes(currentModel) && session.uid !== 2) {
                self.controllerParams.archiveEnabled = "x_active" in ViewInfo.fields; //anything other than "active"
            }
        }
    });
    
    });