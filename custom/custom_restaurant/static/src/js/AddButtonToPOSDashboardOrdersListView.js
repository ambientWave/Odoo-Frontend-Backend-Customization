odoo.define('custom_restaurant.callAPI', function (require) {
    "use strict";
    var rpc = require('web.rpc');
    var ListController = require('web.ListController');

    ListController.include({
        events: _.extend({}, ListController.prototype.events, {"click .custom-btn-class-to-be-found-by-js": "get_call_window"}),
        get_call_window: function(e) {
            var self = this;
            this._rpc({
                model: "custom.python.model.made.to.include.custom.python.method.to.be.called.by.js",
                method: "custom_python_method",
                args: [[]]
            }).then(function(returnedValueReturnedByCustomPythonMethod) {
                window.alert(returnedValueReturnedByCustomPythonMethod)
            });

        }
    });
});