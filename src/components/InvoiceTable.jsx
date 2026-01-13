import { calcDaysLabel, formatCurrency } from "../utils";

const statusStyles = {
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  overdue: "bg-rose-50 text-rose-700 ring-rose-200",
};

const InvoiceTable = ({ invoices, onMarkPaid }) => {
  if (!invoices.length) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm text-slate-500">
        No invoices match your filters.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Invoice #</th>
            <th className="px-4 py-3 font-semibold">Customer</th>
            <th className="px-4 py-3 font-semibold">Invoice Date</th>
            <th className="px-4 py-3 font-semibold">Due Date</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Timing</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-slate-50/60">
              <td className="px-4 py-4 font-semibold text-slate-700">
                {invoice.id}
              </td>
              <td className="px-4 py-4 text-slate-600">
                {invoice.customerName}
              </td>
              <td className="px-4 py-4 text-slate-600">
                {invoice.invoiceDate}
              </td>
              <td className="px-4 py-4 text-slate-600">{invoice.dueDate}</td>
              <td className="px-4 py-4 font-semibold text-slate-700">
                {formatCurrency(invoice.amount)}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                    statusStyles[invoice.status] || statusStyles.pending
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-4 text-slate-600">
                {calcDaysLabel(invoice)}
              </td>
              <td className="px-4 py-4">
                {invoice.status === "paid" ? (
                  <span className="text-xs font-semibold text-slate-400">
                    Paid
                  </span>
                ) : (
                  <button
                    type="button"
                    className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                    onClick={() => onMarkPaid(invoice)}
                  >
                    Mark paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
