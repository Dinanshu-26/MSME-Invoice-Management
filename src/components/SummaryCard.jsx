const toneStyles = {
  default: "border-slate-200 text-slate-900",
  success: "border-emerald-200 text-emerald-700",
  danger: "border-rose-200 text-rose-700",
};

const SummaryCard = ({ label, value, helper, tone = "default" }) => (
  <div
    className={`rounded-2xl border bg-white p-4 shadow-sm ${
      toneStyles[tone] || toneStyles.default
    } transition duration-200 hover:-translate-y-0.5 hover:shadow-md`}
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-3 text-2xl font-semibold">{value}</p>
    {helper ? (
      <p className="mt-2 text-xs text-slate-500">{helper}</p>
    ) : null}
  </div>
);

export default SummaryCard;
