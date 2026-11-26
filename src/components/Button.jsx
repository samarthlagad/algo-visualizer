export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'secondary',
  className = '',
}) {
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-500',
    secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}