# Variables
URL=http://127.0.0.1:8000
SOAP_ACTION="onboard_candidate"
EMPLOYEE_ID=12345
REQUEST_FILE=soap_request.xml
RESPONSE_FILE=soap_response.xml

# Target to run the SOAP API server
run-server:
	@echo "Starting the SOAP API server..."
	python onboard_candidate_soap_api.py

# Generate a sample SOAP request
generate-request:
	@echo "Creating SOAP request for employee_id=$(EMPLOYEE_ID)..."
	@echo '<?xml version="1.0" encoding="UTF-8"?>' > $(REQUEST_FILE)
	@echo '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/onboarding">' >> $(REQUEST_FILE)
	@echo '   <soapenv:Header/>' >> $(REQUEST_FILE)
	@echo '   <soapenv:Body>' >> $(REQUEST_FILE)
	@echo '      <tns:onboard_candidate>' >> $(REQUEST_FILE)
	@echo '         <tns:employee_id>$(EMPLOYEE_ID)</tns:employee_id>' >> $(REQUEST_FILE)
	@echo '      </tns:onboard_candidate>' >> $(REQUEST_FILE)
	@echo '   </soapenv:Body>' >> $(REQUEST_FILE)
	@echo '</soapenv:Envelope>' >> $(REQUEST_FILE)
	@echo "SOAP request saved to $(REQUEST_FILE)."

# Send SOAP request using curl
send-request: generate-request
	@echo "Sending SOAP request to $(URL)..."
	curl -s -X POST -H "Content-Type: text/xml; charset=utf-8" \
	     -H "SOAPAction: $(SOAP_ACTION)" \
	     --data @$(REQUEST_FILE) $(URL) > $(RESPONSE_FILE)
	@echo "Response saved to $(RESPONSE_FILE)."

# View the response
view-response:
	@echo "SOAP Response:"
	@cat $(RESPONSE_FILE)

# Clean up generated files
clean:
	@rm -f $(REQUEST_FILE) $(RESPONSE_FILE)
	@echo "Cleaned up generated files."
