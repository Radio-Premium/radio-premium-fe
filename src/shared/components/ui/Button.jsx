const Button = ({
  children,
  className,
  onClick,
  disabled,
  "data-testid": testId,
}) => {
  return (
    <button
      data-testid={testId}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
