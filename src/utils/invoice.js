const MS_PER_DAY = 1000 * 60 * 60 * 24;

const toStartOfDay = (value) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const toDateInputValue = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
};

const diffInDays = (later, earlier) =>
  Math.round((later.getTime() - earlier.getTime()) / MS_PER_DAY);

export const calcDueDate = (invoiceDate, terms) => {
  const baseDate = toStartOfDay(invoiceDate);
  const termDays = Number(terms);
  if (!baseDate || Number.isNaN(termDays)) {
    return "";
  }
  const dueDate = new Date(baseDate);
  dueDate.setDate(dueDate.getDate() + termDays);
  return toDateInputValue(dueDate);
};

export const calcStatus = ({ paymentDate, dueDate }) => {
  if (paymentDate) {
    return "paid";
  }
  const normalizedDue = toStartOfDay(dueDate);
  if (!normalizedDue) {
    return "pending";
  }
  const today = toStartOfDay(new Date());
  return normalizedDue < today ? "overdue" : "pending";
};

export const calcDaysLabel = ({ status, dueDate, paymentDate }) => {
  const normalizedDue = toStartOfDay(dueDate);
  const normalizedPayment = toStartOfDay(paymentDate);
  const today = toStartOfDay(new Date());

  if (status === "paid") {
    if (!normalizedDue || !normalizedPayment) {
      return "Paid";
    }
    const delta = diffInDays(normalizedPayment, normalizedDue);
    if (delta === 0) {
      return "Paid on time";
    }
    const days = Math.abs(delta);
    return delta < 0 ? `Paid ${days} days early` : `Paid ${days} days late`;
  }

  if (!normalizedDue) {
    return status === "overdue" ? "Overdue" : "Pending";
  }

  if (status === "overdue") {
    const daysLate = Math.max(0, diffInDays(today, normalizedDue));
    return daysLate === 0 ? "Overdue today" : `Overdue by ${daysLate} days`;
  }

  const daysUntil = diffInDays(normalizedDue, today);
  if (daysUntil === 0) {
    return "Due today";
  }
  if (daysUntil < 0) {
    return `Overdue by ${Math.abs(daysUntil)} days`;
  }
  return `Due in ${daysUntil} days`;
};

export const formatCurrency = (amount, locale = "en-IN", currency = "INR") => {
  const value = Number(amount);
  if (Number.isNaN(value)) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(0);
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

export const toTodayInputValue = () => toDateInputValue(new Date());
