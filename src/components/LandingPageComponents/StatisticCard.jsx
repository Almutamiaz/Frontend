const StatisticCard = ({ num, title }) => {
  return (
    <div className="flex flex-col gap-2 py-6 px-11 justify-center items-center rounded-[8px] bg-[var(--Gray-200)] min-w-[228px]">
      <span className="text-[40px] font-extrabold leading-[52px] text-[var(--Gray-800)]">
        {num}+
      </span>
      <span className="text-base font-normal leading-6 text-[var(--Gray-800)]">
        {title}
      </span>
    </div>
  );
};

export default StatisticCard;
