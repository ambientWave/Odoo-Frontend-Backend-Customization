# -*- coding: utf-8 -*-

{
    'name': 'مطعم وجبة كبيرة',
    'version': '1.0',
    'sequence': -100,
    'category': 'Accounting/Accounting',
    'summary': 'وجبة تشبعك',
    'description': """
نظام ادارة المطعم يتكون من جزء لادارة البضاعة والمشتريات وجزء لادارة المبيعات.
    """,
    'depends': ['sales_team', 'payment', 'portal', 'utm', 'sale', 'mail', 'crm', 'l10n_co',
                'point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'security/security.xml',
        'data/data.xml',
        'wizard/remove_invoice_views.xml',
        'views/menu_item.xml',
        'views/pos_combined.xml',
        'views/custom_pos_template.xml',
        'views/inventory_stock.xml',
        'report/report_sale_receipt_template.xml',
        'report/report.xml',
             ],
    'qweb': [
        'static/src/xml/custom_pos.xml',
        'static/src/xml/myButton.xml',
        'static/src/xml/currencyExRatesPopup.xml'
            ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
