from odoo import api, fields, models, _

class POSconfig(models.Model):
    _inherit = 'pos.config'

    discount_passcode = fields.Char(string="Discount Password")