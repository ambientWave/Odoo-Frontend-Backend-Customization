# -*- coding: utf-8 -*-

from datetime import date, datetime, timedelta
from odoo import api, fields, models, _


class WizardCreateInvoice(models.TransientModel):
    _name = "wizard.remove.invoice"  # name of odoo business model that refers to restaurant menu. The dot delimiter is replaced by
    # underscore in some fields inside csv files
    # _inherit = ["mail.thread"]
    _description = "The wizard that is used to show new invoice"
    reason = fields.Selection([
        ('no available deliverymen', 'لا يوجد مندوب توصيل متوفر'),
        ('waiting too long', 'انتظار اكثر من اللازم'),
        ('high price', 'سعر مرتفع'),
        ('no available stock', 'لا تتوفر مكونات في الوقت الحالي'),
    ], required=True, string="سبب الغاء الفاتورة", tracking=True)
    sale_id = fields.Many2one('combined.sale.order', required=False, string="الطلب", tracking=True)
    timestamp = fields.Datetime(string='تاريخ الالغاء', required=True, default=datetime.now())
    sale_status = fields.Selection([
        ('wait', 'انتظار'),
        ('in-operation', 'جاري العمل'),
        ('delivering', 'توصيل'),
        ('completed', 'تم الانتهاء'),
        ('cancelled', 'امر بيع ملغي'),
    ], required=False, string="حالة الطلب", tracking=True)

    # def default_get(self, fields_list):
    #     res = super(MenuItem, self).default_get(fields_list)
    #     res['sale_status'] = 'cancelled'
    #     return res

    @api.model
    def default_get(self, fields_list):
        res = super(WizardCreateInvoice, self).default_get(fields_list)
        print(self._context)
        if self._context.get('active_id'):
            res['sale_id'] = self._context.get('active_id')
        return res

    def action_cancelled(self):
        # todo there must be a function to be executed to delete the old invoice record
        self.sale_status = "cancelled"
        vals = {
            'sale_status': self.sale_status,
            'sale_timestamp': self.timestamp,
            'sale_note': '{0}, {1}'.format(self.reason, self.id)
        }
        sale_rec = self.env['combined.sale.order'].create(vals)
        return {
            'res_model': 'combined.sale.order',
            'view_mode': 'form',
            'type': 'ir.actions.act_window',
            'res_id': sale_rec.id,  # self.env.ref('custom_restaurant.view_combined_sale_order_tree').id,
        }

    def action_view_sale_order(self):
        # action = self.env["ir.actions.actions"]._for_xml_id('custom_restaurant.action_combined_sale_order_tree')
        # action['domain'] = ['&', ('sale_timestamp', '>', datetime.combine(current_date, datetime.min.time())),
        #                     ('sale_timestamp', '<=', datetime.combine(current_date, datetime.max.time()))]
        # these statements can be used interchangeably
        action = self.env.ref('custom_restaurant.action_combined_sale_order_tree').read()[0]
        current_date = date.today()
        action['domain'] = ['&', ('sale_timestamp', '>', datetime.combine(current_date, datetime.min.time())),
                            ('sale_timestamp', '<=', datetime.combine(current_date, datetime.max.time()))]
        return action
