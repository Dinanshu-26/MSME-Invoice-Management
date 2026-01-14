# MSME Invoice Management Dashboard

React + Tailwind dashboard for MSMEs to track invoices, payments, and cash flow.

## Live Demo
- URL: [Add deployment link]

## Features
- Invoice list with status filter, search, and sorting
- Summary cards: Outstanding, Overdue, Paid This Month, Avg Payment Delay
- Add invoice modal with validation and auto due date
- Mark invoice as paid with payment date capture
- Pagination for 500+ invoices
- localStorage persistence

## Tech Stack
- React (CRA)
- Tailwind CSS

## Setup & Run
```bash
npm install
npm start
```

## Approach
- `src/hooks/` holds data logic (`useInvoices`, `useLocalStorage`).
- `src/utils/` holds invoice calculations and formatting.
- UI is split into small components (`SummaryCard`, `FilterBar`, `InvoiceTable`, modals).

## Performance Optimizations
- `useMemo` for filtered/sorted lists and summary totals.
- `useCallback` for handlers passed to child components.
- Pagination to keep rendering fast with 500+ invoices.

## Trade-offs
- No backend; data persists via localStorage only.
- Simple date handling with native Date (no external libs).

## Time Breakdown
- Design & Planning: X hours
- Development: X hours
- Testing & Debugging: X hours
- Total: X hours

## Deployment
- Build: `npm run build`
- Deploy to Netlify/Vercel/GitHub Pages.

## Submission Notes
- Repo: [Add repo link]
- Live URL: [Add deployment link]
