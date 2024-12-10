from spyne import Application, rpc, ServiceBase, Unicode
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

# Mock function to simulate ESB data retrieval
def mock_esb_get_employee_details(employee_id):
    """Mock function to simulate ESB behavior."""
    # In a real-world case, this would interact with the ESB to fetch data
    return {
        "email": f"employee{employee_id}@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "start_date": "2024-12-15"
    }

class OnboardingService(ServiceBase):
    @rpc(Unicode, _returns=Unicode)
    def onboard_candidate(ctx, employee_id):
        """Simulates onboarding by creating a mock email."""
        # Simulate ESB call to get employee details
        employee_details = mock_esb_get_employee_details(employee_id)

        # Create a mock email content
        email_content = (
            f"Subject: Welcome to the Team!\n\n"
            f"Dear {employee_details['first_name']} {employee_details['last_name']},\n\n"
            f"We are excited to have you join us. Your onboarding meeting is scheduled "
            f"based on your start date ({employee_details['start_date']}). Details have been sent "
            f"to your email address ({employee_details['email']}).\n\n"
            f"Welcome aboard!\n\n"
            f"Best Regards,\nHR Team"
        )

        # For the PoC, return the email content
        return f"Mock email created for Employee ID {employee_id}:\n\n{email_content}"

# Define the SOAP Application
application = Application(
    [OnboardingService],
    tns="http://example.com/onboarding",
    in_protocol=Soap11(validator="lxml"),
    out_protocol=Soap11(),
)

# Create a WSGI server
wsgi_app = WsgiApplication(application)

if __name__ == "__main__":
    from wsgiref.simple_server import make_server
    print("SOAP API is running on http://127.0.0.1:8000")
    server = make_server("127.0.0.1", 8000, wsgi_app)
    server.serve_forever()
