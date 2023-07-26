from odoo import api, fields, models

try:
   import qrcode
except ImportError:
   qrcode = None
try:
   import base64
except ImportError:
   base64 = None
from io import BytesIO
class ReportInvoice(models.Model):
   """ inherit Invoice to add report settings """
   _inherit = "account.move"

   qr_code_db = fields.Binary('QRcode', compute="_generate_qr") # , store=True)
   # stored_db_bin = fields.Binary('QRcode2', compute="_generate_qr", store=True)

   @api.depends('qr_code_db', 'payment_reference')
   def _generate_qr(self):

      "method to generate QR code"
      # my_data = []
      # print(self)
      for rec in self:
         if qrcode and base64:
            qr = qrcode.QRCode(
                  version=1,
                  error_correction=qrcode.constants.ERROR_CORRECT_L,
                  box_size=3,
                  border=4,
            )
            qr.add_data(rec.company_id.name)
            qr.add_data(", Payment Reference : ")
            qr.add_data(rec.payment_reference)
            qr.add_data(", Customer : ")
            qr.add_data(rec.partner_id.name)
            qr.add_data(",Invoice Date : ")
            qr.add_data(rec.invoice_date)
            qr.make(fit=True)
            img = qr.make_image()
            temp = BytesIO()
            img.save(temp, format="PNG")
            qr_image = base64.b64encode(temp.getvalue())
            rec.update({'qr_code_db':qr_image})
            # my_data.append(temp.getvalue())
            # print(my_data)
            # rec.stored_db_bin = temp.getvalue()
            # print(rec)
            # print(rec.qr_code_db)
            # print(rec.stored_db_bin)
      # return (''.join(str(e) for e in my_data))