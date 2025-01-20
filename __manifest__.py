# -*- coding: utf-8 -*-
{
    'name': "Fiscal epos print delay",
    
    'summary': "",
  
    'license': 'OPL-1',

    'author': "STeSI Consulting",

    'category': '',
  
    'version': '16.0.0.1',
  
    'website': "https://github.com/ingegniamo/fiscal_epos_print_delay",

    # any module necessary for this one to work correctly
    'depends': ['fiscal_epos_print'],
    
    # always loaded
    'data': [],

     "assets": {
        "point_of_sale.assets": [
            "fiscal_epos_print_delay/static/src/js/Screens/PaymentScreen/PaymentScreen.js",
        ],
        },

    'application': False,
}
