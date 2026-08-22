const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ErrorAlert = ({ error, searchTerm }) => (
  <div className="animate-fade-up mx-auto my-16 max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
    <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-border bg-elevated text-text-secondary">
      <AlertIcon />
    </span>
    <h3 className="mt-5 font-display text-xl font-medium italic">
      That trace went cold.
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
      Nothing came back for{" "}
      <span className="font-display italic text-text">“{searchTerm}”</span> —{" "}
      {typeof error === "string" ? error.toLowerCase() : "please try again"}.
    </p>
  </div>
);

export default ErrorAlert;
