const ChannelSection = ({
  title,
  subTitleList,
  children,
  marginTop,
  height,
}) => {
  return (
    <section>
      <h2 className={`mb-2 text-base font-semibold ${marginTop}`}>{title}</h2>
      {subTitleList && (
        <div className="mt-1 text-sm text-[#888888]">
          {subTitleList.map((subtitle) => (
            <p>{subtitle}</p>
          ))}
        </div>
      )}
      <ul
        className={`scrollbar-hide flex w-full flex-col items-center overflow-scroll ${height}`}
      >
        {children}
      </ul>
    </section>
  );
};

export default ChannelSection;
