function App() {
  return (
    <div className="min-h-screen px-6 py-10">
      <header className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-slate-500">QistonPe</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          MSME Invoice Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Track invoices, payment status, and cash flow in one place.
        </p>
      </header>

      <main className="mx-auto mt-8 max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Phase 0 setup complete. Next: summary cards, filters, and invoice
          table.
        </p>
      </main>
    </div>
  );
}

export default App;
