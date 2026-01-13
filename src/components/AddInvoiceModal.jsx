import { useEffect, useMemo, useState } from "react";
import { calcDueDate, toTodayInputValue } from "../utils";

const termOptions = [7, 15, 30, 45, 60];

const AddInvoiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    customerName: "",
    amount: "",
    invoiceDate: toTodayInputValue(),
    paymentTerms: termOptions[2],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormValues({
        customerName: "",
        amount: "",
        invoiceDate: toTodayInputValue(),
        paymentTerms: termOptions[2],
      });
      setErrors({});
    }
  }, [isOpen]);

  const dueDate = useMemo(
    () => calcDueDate(formValues.invoiceDate, formValues.paymentTerms),
    [formValues.invoiceDate, formValues.paymentTerms]
  );

  if (!isOpen) {
    return null;
  }

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!formValues.customerName.trim()) {
      nextErrors.customerName = "Customer name is required.";
    }
    const amountValue = Number(formValues.amount);
    if (!formValues.amount || Number.isNaN(amountValue) || amountValue <= 0) {
      nextErrors.amount = "Amount must be a positive number.";
    }
    if (!formValues.invoiceDate) {
      nextErrors.invoiceDate = "Invoice date is required.";
    }
    if (!formValues.paymentTerms) {
      nextErrors.paymentTerms = "Select payment terms.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    onSubmit({
      customerName: formValues.customerName.trim(),
      amount: amountValue,
      invoiceDate: formValues.invoiceDate,
      paymentTerms: Number(formValues.paymentTerms),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">New Invoice</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Add invoice details
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
            Customer Name
            <input
              className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
              value={formValues.customerName}
              onChange={handleChange("customerName")}
              placeholder="e.g. Acme Manufacturing"
            />
            {errors.customerName ? (
              <span className="mt-2 text-xs text-rose-600">
                {errors.customerName}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col text-xs font-semibold text-slate-500">
            Invoice Amount
            <input
              type="number"
              min="0"
              className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
              value={formValues.amount}
              onChange={handleChange("amount")}
              placeholder="e.g. 25000"
            />
            {errors.amount ? (
              <span className="mt-2 text-xs text-rose-600">
                {errors.amount}
              </span>
            ) : null}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-xs font-semibold text-slate-500">
              Invoice Date
              <input
                type="date"
                className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
                value={formValues.invoiceDate}
                onChange={handleChange("invoiceDate")}
              />
              {errors.invoiceDate ? (
                <span className="mt-2 text-xs text-rose-600">
                  {errors.invoiceDate}
                </span>
              ) : null}
            </label>

            <label className="flex flex-col text-xs font-semibold text-slate-500">
              Payment Terms (days)
              <select
                className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
                value={formValues.paymentTerms}
                onChange={handleChange("paymentTerms")}
              >
                {termOptions.map((term) => (
                  <option key={term} value={term}>
                    {term} days
                  </option>
                ))}
              </select>
              {errors.paymentTerms ? (
                <span className="mt-2 text-xs text-rose-600">
                  {errors.paymentTerms}
                </span>
              ) : null}
            </label>
          </div>

          <label className="flex flex-col text-xs font-semibold text-slate-500">
            Due Date (auto-calculated)
            <input
              type="text"
              readOnly
              className="mt-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
              value={dueDate || "Select invoice date"}
            />
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
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Add Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
