# Money Manager

A comprehensive Money Manager application to track income, expenses, and visualize financial data.

## Project Structure

The project is divided into two main parts:

- **Frontend**: A React-based user interface located in `money-manager-frontend`.
- **Backend**: A Spring Boot Java application located in `money-manager-backend`.

## Features

- **Dashboard**: View summary statistics and financial overview.
- **Transactions**: 
  - View recent transactions.
  - Add new transactions (Income/Expense).
  - List and filter transactions.
- **Visualizations**:
  - Income vs Expense Charts.
  - Category Summaries.
- **Management**:
  - Category management.
  - Date and time filtering.

## Getting Started

### Prerequisites

- Node.js and npm (for Frontend)
- Java JDK and Maven (for Backend)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd money-manager-backend
   ```
2. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server typically runs on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd money-manager-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend application will typically run on `http://localhost:3000`.

## Documentation

For more detailed documentation, please refer to the `Money Manager Documentation.docx` file included in this repository.
