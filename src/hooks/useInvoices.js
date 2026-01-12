import { useMemo } from "react";
import { seedInvoices } from "../data/seedInvoices";
import {
  calcDueDate,
  calcStatus,
  toTodayInputValue,
} from "../utils/invoice";
import useLocalStorage from "./useLocalStorage";

const normalizeInvoice = (invoice) => {
  const dueDate =
    invoice.dueDate || calcDueDate(invoice.invoiceDate, invoice.paymentTerms);
  const status = calcStatus({
    paymentDate: invoice.paymentDate,
    dueDate,
  });
  return {
    ...invoice,
    dueDate,
    status,
  };
};

const buildId = () => `INV-${Date.now()}`;

const createInvoice = (payload) => {
  const dueDate = calcDueDate(payload.invoiceDate, payload.paymentTerms);
  const paymentDate = payload.paymentDate || null;
  const status = calcStatus({ paymentDate, dueDate });
  return {
    id: payload.id || buildId(),
    customerName: payload.customerName,
    amount: Number(payload.amount),
    invoiceDate: payload.invoiceDate,
    paymentTerms: Number(payload.paymentTerms),
    dueDate,
    paymentDate,
    status,
  };
};

export const useInvoices = () => {
  const [invoices, setInvoices] = useLocalStorage(
    "quistonpe_invoices",
    seedInvoices.map(normalizeInvoice)
  );

  const normalizedInvoices = useMemo(
    () => invoices.map(normalizeInvoice),
    [invoices]
  );

  const addInvoice = (payload) => {
    const nextInvoice = createInvoice(payload);
    setInvoices((prev) => [...prev, nextInvoice]);
  };

  const markPaid = (id, paymentDate = toTodayInputValue()) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id
          ? normalizeInvoice({
              ...invoice,
              paymentDate,
              status: "paid",
            })
          : invoice
      )
    );
  };

  const updateInvoice = (id, updates) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? normalizeInvoice({ ...invoice, ...updates }) : invoice
      )
    );
  };

  return {
    invoices: normalizedInvoices,
    addInvoice,
    markPaid,
    updateInvoice,
    setInvoices,
  };
};
