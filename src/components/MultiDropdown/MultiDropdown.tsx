import { useState } from "react";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  disabled,
  onChange,
  pluralizeOptions,
}) => {
  const [showOption, setShowOption] = useState(false);

  const handleCheck = (checkedValue: Option) => {
    value.some((option) => checkedValue.key === option.key)
      ? onChange(value.filter((option) => option.key !== checkedValue.key))
      : onChange([...value, checkedValue]);
  };

  return (
    <div className="drop-down">
      <>
        <button
          className="drop-down__item"
          onClick={() => setShowOption((state) => !state)}
        >
          {pluralizeOptions(value)}
        </button>
        {!disabled &&
          showOption &&
          options.map(({ key, value }) => {
            return (
              <div
                className="drop-down__item"
                key={key}
                onClick={() => handleCheck({ key, value })}
              >
                {value}
              </div>
            );
          })}
      </>
    </div>
  );
};

export default MultiDropdown;
