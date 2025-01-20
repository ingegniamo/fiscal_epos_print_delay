odoo.define("fiscal_epos_print_delay.PaymentScreen_Delay", function (require) {
    "use strict";    
    var PaymentScreen = require("fiscal_epos_print.PaymentScreen");
    var core = require("web.core");
    var epson_epos_print = require("fiscal_epos_print.epson_epos_print");
    var _t = core._t;
    var eposDriver = epson_epos_print.eposDriver;
    const Registries = require("point_of_sale.Registries");

    const MyPaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            async sendToFP90Printer(order) {
                console.log(999999)
                if (this.env.pos.config.printer_ip && !order.is_to_invoice()) {
                    // TODO self.chrome does not exists
                    // this.chrome.loading_show();
                    // this.chrome.loading_message(_t('Connecting to the fiscal printer'));
                    if (
                        order.has_refund &&
                        this.env.pos.context &&
                        this.env.pos.context.refund_details
                    ) {
                        order.refund_date = this.env.pos.context.refund_date;
                        order.refund_report = this.env.pos.context.refund_report;
                        order.refund_doc_num = this.env.pos.context.refund_doc_num;
                        order.refund_cash_fiscal_serial =
                            this.env.pos.context.refund_cash_fiscal_serial;
                    }
    
                    var printer_options = order.getPrinterOptions();
                    printer_options.order = order;
                    var receipt = order.export_for_printing();
                    var fp90 = new eposDriver(printer_options, this);
                    await fp90.printFiscalReceipt(receipt);
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    // This line causes problems on bill split. What's the sense of deleting the actual pos context?!
                    // It regenerates orders which are already partly paid using split function...
                    // this.env.pos.context = {};
                }
            }
        }
        Registries.Component.extend(PaymentScreen, MyPaymentScreen);
   return PaymentScreen;
})