const SkeletonCard = () => (
  <div aria-hidden="true">
    <div className="skeleton aspect-[2/3] rounded-xl border border-border/60" />
    <div className="skeleton mt-3 h-3.5 w-3/4 rounded-md" />
    <div className="skeleton mt-2 h-3 w-1/3 rounded-md" />
  </div>
);

export default SkeletonCard;
