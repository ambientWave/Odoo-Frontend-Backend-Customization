from odoo import models


class CustomModel(models.Model):
    _name = "custom.python.model.made.to.include.custom.python.method.to.be.called.by.js"
    _inherit = "pos.order"

    def custom_python_method(self):
        return 'test message from python method called by JS rpc'


