import { useState } from "react";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  disabled,
  onChange,
  ...props
}) => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState((state) => !state);
    onChange(state);
  };

  return (
    <input
      {...props}
      type="checkbox"
      disabled={disabled}
      onClick={handleClick}
    />
  );
};

export default CheckBox;
