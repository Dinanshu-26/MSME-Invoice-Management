const FilterBar = ({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex flex-col text-xs font-semibold text-slate-500">
        Status
        <select
          className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </label>

      <label className="flex flex-1 flex-col text-xs font-semibold text-slate-500">
        Search
        <input
          className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
          placeholder="Invoice # or customer"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </div>

    <label className="flex flex-col text-xs font-semibold text-slate-500">
      Sort by
      <select
        className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="dueDate">Due date</option>
        <option value="invoiceDate">Invoice date</option>
        <option value="amount-desc">Amount (high to low)</option>
        <option value="amount-asc">Amount (low to high)</option>
      </select>
    </label>
  </div>
);

export default FilterBar;
