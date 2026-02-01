# Money Manager – Frontend

React web app for the Money Manager. It lets users add and edit income and expenses, view dashboard stats by week/month/year, filter transactions, and see category summaries and recent activity.

---

## What We Built

- **Dashboard**
  - Period dropdown: **This Week**, **This Month**, **This Year** (weekly/monthly/yearly income and expenditure).
  - Summary cards: Total Income, Total Expense, Total Balance (₹).
  - Expense by category (pie chart) and Income vs Expense (bar chart).
  - Category summary.
  - Recent transactions (last few entries).

- **Transactions Page**
  - Full transaction history with pagination.
  - Filters: **From Date**, **To Date**, **Category**, **Division** (Office / Personal) with Apply and Reset.

- **Add / Edit Transaction (Modal)**
  - **Add** button in the header opens a modal with two tabs: **Income** and **Expense**.
  - Fields: Amount (₹), Category (fuel, food, movie, loan, medical, other), Division (Office, Personal), Date & Time, Description.
  - **Income**: optional “To Account” (Cash, Bank, Wallet).
  - **Expense**: optional “From Account”.
  - **Edit**: allowed only within **12 hours**; edit button hidden after that.

- **Transaction Display**
  - Income (green) and Expense (red) with icons and account labels (To/From account when set).
  - Amounts shown as +/− with Indian Rupee (₹) formatting.

- **UX**
  - Responsive layout (mobile and desktop), Tailwind CSS styling, Lucide React icons, simple page switching (Dashboard / Transactions) without a router.

---

## Tech Stack

| Purpose        | Technology                    |
|----------------|-------------------------------|
| UI Library     | React 18                      |
| Build          | Create React App (react-scripts) |
| Styling        | Tailwind CSS 4                |
| HTTP Client    | Axios                         |
| Charts         | Recharts                      |
| Icons          | Lucide React, React Icons     |
| State          | React Context (no Redux)      |

---

## Prerequisites

- **Node.js** (v16 or v18+ recommended)
- **npm** (or yarn / pnpm)

---

## How to Run

1. **Install dependencies**
   ```bash
   cd money-manager-frontend
   npm install
   ```

2. **Start the backend**
   - Backend must be running at **http://localhost:8080** (see `money-manager-backend/README.md`).
   - For local dev, the frontend uses `http://localhost:8080` by default.

3. **Start the frontend**
   ```bash
   npm start
   ```
   - Uses Tailwind watch + React dev server (via `concurrently`).
   - App opens at **http://localhost:3000** (or the next free port).

4. **Production build**
   ```bash
   npm run build
   ```
   - Output is in the `build` folder. Serve it with any static file server.

---

## Scripts

| Command        | Description                                  |
|----------------|----------------------------------------------|
| `npm start`    | Run dev server + Tailwind watch              |
| `npm run build`| Production build (CSS + React)                |
| `npm test`     | Run tests                                    |
| `npm run watch:css`   | Tailwind watch only (no React)        |
| `npm run build:css`   | Tailwind build only (no React)        |

---

## Project Structure (Overview)

```
src/
├── App.js                 # Root: GlobalProvider, AppLayout, page state
├── index.js               # Entry point
├── index.css              # Tailwind input
├── constants/
│   └── index.js           # CATEGORIES, DIVISIONS, ACCOUNTS
├── context/
│   └── GlobalContext.js   # Shared state, API calls (load, filter, add, edit)
├── services/
│   └── api.js             # Axios instance, endpoints (transactions, dashboard, filter)
├── components/
│   ├── Layout/
│   │   └── AppLayout.jsx   # Header, nav (Dashboard/Transactions), Add button, modal
│   ├── Modals/
│   │   └── AddTransactionModal.jsx  # Income / Expense form
│   ├── Dashboard/
│   │   ├── DashboardStats.jsx       # Summary cards
│   │   └── CategorySummaryTable.jsx # Category table
│   ├── Charts/
│   │   ├── StatsChart.jsx          # Expense by category (pie)
│   │   └── IncomeVsExpenseChart.jsx # Income vs expense (bar)
│   ├── Filters/
│   │   └── Filters.jsx    # Date range, category, division
│   ├── Transactions/
│   │   ├── TransactionList.jsx     # Paginated list + edit
│   │   └── RecentTransactions.jsx # Dashboard recent list
│   └── UI/
│       ├── Select.jsx, DatePicker.jsx, DateTimePicker.jsx
├── pages/
│   ├── Dashboard.jsx      # Dashboard view
│   └── Transactions.jsx  # Transactions + filters + category summary
```

---

## Configuration

- **Backend URL**
  - **Local:** Default is `http://localhost:8080` (no config needed).
  - **Production / Live:** Set the env var **`REACT_APP_API_URL`** to your deployed backend URL (no trailing slash), then rebuild.
    - Example: `REACT_APP_API_URL=https://money-manager-api.railway.app`
    - Netlify/Vercel: add `REACT_APP_API_URL` in **Environment variables**, then redeploy.
    - Local build for production: `REACT_APP_API_URL=https://your-backend.com npm run build`
  - If `REACT_APP_API_URL` is not set in production, the app will try to call `localhost:8080`, so **dashboard and API calls will fail on the live site** until you set it.

---

## Notes

- Currency is displayed in **Indian Rupees (₹)** using `en-IN` locale.
- Categories and divisions are aligned with the backend (e.g. OFFICE, PERSONAL; fuel, food, movie, loan, medical, other).
- Transfer is not available in the UI; only Income and Expense can be added or edited from the app.
