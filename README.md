

```markdown
# Clock In Control Center (3C)

## Project Overview

Clock In Control Center (3C) is a comprehensive solution for managing employee attendance, leave, and events. It utilizes .NET Restful Onion Architecture API for the backend, React Redux for the frontend, and JWT authentication for secure access. The system incorporates role-based access control, allowing administrators and employees to perform various tasks related to clocking in, clocking out, breaks, and more.

## Features

- JWT Authentication and Authorization
- Role-based access control (Employee, Admin, HR)
- Employee, Leave, and Event Management
- Clock In, Clock Out, and Break Time tracking
- Calculation of actual hours and productivity metrics
- Separate dashboards for employees and administrators/HR
- Microsoft SQL Server Management Studio for database storage and migration

## Prerequisites

Before you begin, ensure you have the following installed:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [Microsoft SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

## Installation

### Backend (API)

1. Clone the repository:

   ```bash
https://github.com/Pavan-Sonawane/ClockIn-Control-Center--3C--Using-Asp.net-API-Onion-Architecture-.git   ```

2. Navigate to the backend folder:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   dotnet restore
   ```

4. Set up the database (using Entity Framework Migrations):

   ```bash
   dotnet ef database update
   ```

5. Run the API:

   ```bash
   dotnet run
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the React app:

   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser.
2. Register or log in based on your role.
3. Explore the employee or admin/HR dashboard.
4. Perform clock in, clock out, leave requests, and event management.

## Database Migration

To apply database migrations, use the following command:

```bash
dotnet ef database update
```




