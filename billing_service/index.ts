import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Simulated database
// Simulated database
const employeeDB: { id: string; companyId: string; payroll: number; startDate: string }[] = [
    { id: "1", companyId: "A", payroll: 3000, startDate: "2024-01-01" },
    { id: "2", companyId: "A", payroll: 4000, startDate: "2024-02-01" },
    { id: "3", companyId: "B", payroll: 5000, startDate: "2024-03-01" },
];

const clientRates: { [companyId: string]: number } = {
    A: 1.2, // 20% additional cost for company A
    B: 1.3, // 30% additional cost for company B
};

app.get("/employee/:employee_id/:company_id", (req, res) => {
    const { employee_id, company_id } = req.params;

    // Find employee in the database
    const employee = employeeDB.find(
        (emp) => emp.id === employee_id && emp.companyId === company_id
    );

    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ data: employee });
});

// Route to update employee data
app.post("/employee/:employee_id/:company_id", (req, res) => {
    const { employee_id, company_id } = req.params;
    const { payroll, startDate } = req.body;

    if (!payroll || !startDate) {
        return res.status(400).json({ error: "Payroll and start date are required" });
    }

    // Find employee in the database
    const employee = employeeDB.find(
        (emp) => emp.id === employee_id && emp.companyId === company_id
    );

    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }

    // Update employee data
    employee.payroll = payroll;
    employee.startDate = startDate;

    return res.status(200).json({
        message: "Employee data updated successfully",
        data: employee,
    });
});

// Route to calculate and send the client bill
app.get("/bill/:company_id", (req, res) => {
    const { company_id } = req.params;

    // Filter employees belonging to the company
    const companyEmployees = employeeDB.filter((emp) => emp.companyId === company_id);

    if (companyEmployees.length === 0) {
        return res.status(404).json({ error: "No employees found for this company" });
    }

    // Calculate total payroll cost
    const totalPayroll = companyEmployees.reduce((sum, emp) => sum + emp.payroll, 0);

    // Apply client-specific rate
    const rate = clientRates[company_id];
    if (!rate) {
        return res.status(400).json({ error: "No rate defined for this company" });
    }

    const totalCost = totalPayroll * rate;

    // Return the bill
    return res.status(200).json({
        companyId: company_id,
        totalPayroll,
        rate,
        totalCost,
        message: `The total cost for company ${company_id} is $${totalCost.toFixed(2)}`,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
