import { useEffect, useState } from "react";
import { toTodayInputValue } from "../utils";

const MarkPaidModal = ({ isOpen, invoice, onClose, onConfirm }) => {
  const [paymentDate, setPaymentDate] = useState(toTodayInputValue());
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPaymentDate(toTodayInputValue());
      setError("");
    }
  }, [isOpen]);

  if (!isOpen || !invoice) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (invoice?.invoiceDate && paymentDate < invoice.invoiceDate) {
      setError("Payment date cannot be before the invoice date.");
      return;
    }
    onConfirm(paymentDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Mark as Paid</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {invoice.id} - {invoice.customerName}
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full px-2 py-1 text-sm text-slate-500 hover:text-slate-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col text-xs font-semibold text-slate-500">
            Payment Date
            <input
              type="date"
              className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
              value={paymentDate}
              onChange={(event) => setPaymentDate(event.target.value)}
              min={invoice?.invoiceDate || undefined}
              required
            />
            {error ? (
              <span className="mt-2 text-xs text-rose-600">{error}</span>
            ) : null}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkPaidModal;
