odoo.define('custom_restaurant.ButtonInUpperPannelOfList', function (require) {
    'use strict';
    var ListController = require("web.ListController");

    var includeDict = {
        renderButtons: function () {
            this._super.apply(this, arguments);
            if (this.modelName === "account.account") {
                var coa_button = this.$buttons.find('.o_list_button');
                coa_button.on('click', this.proxy('o_button_click'));
            }
        },
        o_button_click: function(e){
          
                var action = {
                    type: 'ir.actions.client',
                    name: 'New Custom View',
                    tag: 'account_group_hierarchy',
                  
                };
                this.do_action(action);
                alert(`myButton is pressed! CLient Action Manager is responsible for this.
                An Action must be defined in src\\xml and linked by putting this action
                 tag in core.action_registry.add("action id", defined JS module name (not file name)); at the end of js file`);
                alert(`<odoo>
                <data>
                    <record model="ir.actions.client" id="action_client_example">
                        <field name="name">Example Client Action</field>
                        <field name="tag">example.action</field>
                    </record>
                    <menuitem action="action_client_example"
                              id="menu_client_example"/>
                </data>
            </odoo>
            
                    <!-- Bill of Materials -->
                    <record id="action_report_mrp_bom" model="ir.actions.client">
                        <field name="name">BoM Structure &amp; Cost</field>
                        <field name="tag">mrp_bom_report</field>
                        <field name="context" eval="{'model': 'report.mrp.report_bom_structure'}" />
                    </record>`);

    
        }
    };
    ListController.include(includeDict);
});