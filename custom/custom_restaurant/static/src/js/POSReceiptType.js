odoo.define('custom_restaurant.POSReceiptType', function (require) {
    "use strict";
    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');

    class POSReceiptType extends PosComponent {
        constructor() {
            super(...arguments);
        }

        mounted() {
            // add the code here that you wish to be executed once the component is mounted/DOM-created
            console.log(this.env);
            console.log(this.env.pos);
        }

        setDefault() {
            alert('test')
        }

        setA4() {
            alert('test')
        }

        setA5() {
            alert('test')
        }

        setA1() {
            alert('test')
        }

    }

    POSReceiptType.template = "POSReceiptTypeTemplate";
    Registries.Component.add(POSReceiptType);

    
    });