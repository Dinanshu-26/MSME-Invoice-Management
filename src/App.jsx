import { useMemo, useState } from "react";
import AddInvoiceModal from "./components/AddInvoiceModal";
import FilterBar from "./components/FilterBar";
import InvoiceTable from "./components/InvoiceTable";
import MarkPaidModal from "./components/MarkPaidModal";
import SummaryCard from "./components/SummaryCard";
import { useInvoices } from "./hooks";
import { formatCurrency } from "./utils";

const getDateValue = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const sortInvoices = (items, sortBy) => {
  const sorted = [...items];
  switch (sortBy) {
    case "amount-asc":
      return sorted.sort((a, b) => a.amount - b.amount);
    case "amount-desc":
      return sorted.sort((a, b) => b.amount - a.amount);
    case "invoiceDate":
      return sorted.sort(
        (a, b) => getDateValue(b.invoiceDate) - getDateValue(a.invoiceDate)
      );
    case "dueDate":
      return sorted.sort(
        (a, b) => getDateValue(b.dueDate) - getDateValue(a.dueDate)
      );
    default:
      return sorted;
  }
};

const getMonthKey = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return `${date.getFullYear()}-${date.getMonth()}`;
};

function App() {
  const { invoices, addInvoice, markPaid } = useInvoices();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  const filteredInvoices = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    const statusFiltered =
      statusFilter === "all"
        ? invoices
        : invoices.filter((invoice) => invoice.status === statusFilter);
    const searched = search
      ? statusFiltered.filter(
          (invoice) =>
            invoice.id.toLowerCase().includes(search) ||
            invoice.customerName.toLowerCase().includes(search)
        )
      : statusFiltered;
    return sortInvoices(searched, sortBy);
  }, [invoices, searchQuery, sortBy, statusFilter]);

  const summary = useMemo(() => {
    const todayMonth = getMonthKey(new Date());
    let outstanding = 0;
    let overdue = 0;
    let paidThisMonth = 0;
    let paidDelayTotal = 0;
    let paidDelayCount = 0;

    filteredInvoices.forEach((invoice) => {
      if (invoice.status === "pending" || invoice.status === "overdue") {
        outstanding += invoice.amount;
      }
      if (invoice.status === "overdue") {
        overdue += invoice.amount;
      }
      if (invoice.status === "paid" && invoice.paymentDate) {
        if (getMonthKey(invoice.paymentDate) === todayMonth) {
          paidThisMonth += invoice.amount;
        }
        const dueMs = getDateValue(invoice.dueDate);
        const paidMs = getDateValue(invoice.paymentDate);
        if (dueMs && paidMs) {
          const deltaMs = paidMs - dueMs;
          const delayDays = Math.max(
            0,
            Math.round(deltaMs / (1000 * 60 * 60 * 24))
          );
          paidDelayTotal += delayDays;
          paidDelayCount += 1;
        }
      }
    });

    return {
      outstanding,
      overdue,
      paidThisMonth,
      avgDelay: paidDelayCount ? paidDelayTotal / paidDelayCount : 0,
    };
  }, [filteredInvoices]);

  return (
    <div className="min-h-screen px-6 py-10">
      <header className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">QistonPe</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              MSME Invoice Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Track invoices, payment status, and cash flow in one place.
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            onClick={() => setIsAddOpen(true)}
          >
            Add Invoice
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total Outstanding"
            value={formatCurrency(summary.outstanding)}
            helper="Pending + overdue invoices"
          />
          <SummaryCard
            label="Total Overdue"
            value={formatCurrency(summary.overdue)}
            helper="Overdue invoices only"
            tone="danger"
          />
          <SummaryCard
            label="Total Paid (This Month)"
            value={formatCurrency(summary.paidThisMonth)}
            helper="Invoices paid in current month"
            tone="success"
          />
          <SummaryCard
            label="Average Payment Delay"
            value={`${summary.avgDelay.toFixed(1)} days`}
            helper="Paid invoices only"
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FilterBar
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <InvoiceTable
            invoices={filteredInvoices}
            onMarkPaid={(invoice) => setActiveInvoice(invoice)}
          />
        </section>
      </main>

      <AddInvoiceModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={addInvoice}
      />
      <MarkPaidModal
        isOpen={Boolean(activeInvoice)}
        invoice={activeInvoice}
        onClose={() => setActiveInvoice(null)}
        onConfirm={(paymentDate) => {
          if (activeInvoice) {
            markPaid(activeInvoice.id, paymentDate);
          }
        }}
      />
    </div>
  );
}

export default App;
