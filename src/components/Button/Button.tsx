import WithLoader from "@components/WithLoader";
import classNames from "classnames";

import style from "./Button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
  className?: string;
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading = false,
  color = "primary",
  children,
  className,
  disabled = false,
  ...props
}) => {
  let buttonClasses = classNames(
    `${style.button}`,
    `${style[`button_color-${color}`]}`,
    className ? `${style[className]}` : false,
    {
      button_disabled: loading || disabled,
    }
  );

  return (
    <button {...props} className={buttonClasses} disabled={loading || disabled}>
      <WithLoader loading={loading}>{children}</WithLoader>
    </button>
  );
};

export default Button;
