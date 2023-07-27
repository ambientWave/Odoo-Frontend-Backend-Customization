odoo.define('custom_restaurant.callAPI', function (require) {
    "use strict";
    var rpc = require('web.rpc');
    var ListController = require('web.ListController');

    ListController.include({
        events: _.extend({}, ListController.prototype.events, {"click .custom-btn-class-to-be-found-by-js": "myCustomFunction"}),
        myCustomFunction: function(e) {
            var self = this;
            this._rpc({
                model: "python.model.include.method.called.by.js",
                method: "custom_python_method",
                args: [[]]
            }).then(function(returnedValueReturnedByCustomPythonMethod) {
                console.log(self._rpc); //not this._rpc
                console.log(rpc)
                console.log(ListController); //its prototype is important
                open("https://web.whatsapp.com/send?phone=+201234567890&text=test%20message"); //or window.open
                alert(returnedValueReturnedByCustomPythonMethod); //or window.alert
            });

        }
    });
});