import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled = false,
  ...props
}) => {
  let inputClasses = classNames("input", className, {
    input_disabled: disabled,
  });

  return (
    <input
      {...props}
      type="text"
      className={inputClasses}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
