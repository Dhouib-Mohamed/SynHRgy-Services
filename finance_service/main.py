from spyne import Application, rpc, ServiceBase, Integer, Unicode, String
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
import os

class FinanceService(ServiceBase):
    # Mock database for invoices
    invoices = {}

    @rpc(Integer, _returns=Unicode)
    def generate_invoice(ctx, offer_id):
        # Simulate invoice generation with mock data
        invoice_id = len(FinanceService.invoices) + 1
        invoice_data = {
            "invoice_id": invoice_id,
            "offer_id": offer_id,
            "amount": 1000.00,  # Example amount
            "status": "Generated",
        }
        FinanceService.invoices[invoice_id] = invoice_data

        return f"Invoice generated: {invoice_data}"

    @rpc(Integer, _returns=String)
    def validate_invoice(ctx, invoice_id):
        # Simulate invoice validation logic
        if invoice_id not in FinanceService.invoices:
            return f"Invoice with ID {invoice_id} not found."

        invoice_data = FinanceService.invoices[invoice_id]
        invoice_data["status"] = "Paid"  # Update status to "Paid"
        FinanceService.invoices[invoice_id] = invoice_data

        return f"Invoice validated: {invoice_data}"

    @rpc(Integer, _returns=String)
    def pay_invoice(ctx, invoice_id):
        # Simulate payment processing logic
        if invoice_id not in FinanceService.invoices:
            return f"Invoice with ID {invoice_id} not found."

        invoice_data = FinanceService.invoices[invoice_id]

        # Simulate connecting with Stripe and validating payment
        # (In a real implementation, this would involve API calls to Stripe)
        # For example:
        # stripe_response = stripe.Charge.create(...)
        # if stripe_response['status'] == 'succeeded':
        invoice_data["status"] = "Paid"
        invoice_data["payment_method"] = "Stripe"

        FinanceService.invoices[invoice_id] = invoice_data

        return f"Invoice payment processed: {invoice_data}"

# Load environment variables
APP_NAME = os.getenv("APP_NAME", "FinanceService")
APP_PORT = os.getenv("APP_PORT", "8082")

# Define the SOAP Application
application = Application(
    [FinanceService],
    tns=f"http://{APP_NAME}.example.com",
    in_protocol=Soap11(validator="lxml"),
    out_protocol=Soap11()
)

if __name__ == "__main__":
    from wsgiref.simple_server import make_server

    print(f"Starting {APP_NAME} on port {APP_PORT}...")
    wsgi_app = WsgiApplication(application)
    server = make_server("0.0.0.0", int(APP_PORT), wsgi_app)
    server.serve_forever()
