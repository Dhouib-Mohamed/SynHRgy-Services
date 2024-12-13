# SynHRgy-Services

## Services Description

This repository contains the services that are part of the SynHRgy project. The services are:

1. **Recruitment Service**: A simple **Recruitment Service (Back Office)** RESTful API built with **Express.js**. It allows you to list job applications and update their statuses, simulating integration with a Document Processing system via logs.
2. **Billing Service**: A simple **Billing Service** RESTful API built with **Express.js**. It manages payroll records for employees and calculates billing costs for client companies.
3. **Document Processing Service**: A simple **Document Processing Service** RESTful API built with **Go**. It processes job applications.
4. **Client Relations Service**: A simple **Client Relations Service** RESTful API built with **Express.js**. It manages client data and provides endpoints to retrieve and update client information.
5. **Training Service**: A simple **Training Service** SOAP API built with **Python**. It manages training programs and provides endpoints to retrieve and update training information.

## Deployment

```bash
docker-compose up
```

#### Services:
- **Billing Service**: [http://localhost:4000](http://localhost:4000)
- **Client Relations Service**: [http://localhost:4001](http://localhost:4001)
- **Document Processing Service**: [http://localhost:4002](http://localhost:4002)
- **Recruitment Service**: [http://localhost:4003](http://localhost:4003)
- **Training Service**: [http://localhost:4004](http://localhost:4004)

