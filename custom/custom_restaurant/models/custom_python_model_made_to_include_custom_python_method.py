from odoo import models


class CustomModel(models.Model):
    _name = "python.model.include.method.called.by.js"
    _inherit = "pos.order"

    def custom_python_method(self):
        return 'test message from python method called by JS rpc'


