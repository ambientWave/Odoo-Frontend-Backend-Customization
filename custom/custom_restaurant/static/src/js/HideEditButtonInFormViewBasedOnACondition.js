odoo.define('custom_restaurant.HideEditButtonBasedOnACondition', function (require) {
    "use strict";

    // var session = require('web.session');
    var FormController = require('web.FormController');

    FormController.include({
        getSelectedIds: function() {
            var menu = this.$el.find(".o_form_button_edit");

            var button = this.$buttons.find("o_form_button_edit").show();
            if (this.modelName === "stock.picking") {
                var currentModelViewedRecord = this.model.get(this.handle).data;
                console.log(this.modelName);
                console.log(this.model.get(this.handle).data);
                console.log(currentModelViewedRecord.state);

                if (currentModelViewedRecord.state === 'done') {
                    this.$buttons.find("o_form_button_edit").hide();
                }
            }

            return this._super.apply(this, arguments);

        }
    //     init: function(ViewInfo, params) {
    //         var self = this;
    //         this._super.apply(this, arguments);

    //         var currentModel = self.controllerParams.modelName;
    //         var affectedModels = ['product.template'];

    //         if(affectedModels.includes(currentModel) && session.uid !== 2) {
    //             self.controllerParams.archiveEnabled = "x_active" in ViewInfo.fields; //anything other than "active"
    //         }
    //     }
    });
    
    });