const Checkbox = ({
  children,
  checked,
  onChange,
  labelClassName,
  inputClassName,
}) => {
  return (
    <label
      className={`flex cursor-pointer items-center gap-[10px] ${labelClassName}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`shrink-0 accent-black ${inputClassName}`}
      />
      {children}
    </label>
  );
};

export default Checkbox;
