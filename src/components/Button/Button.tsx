import WithLoader from "@components/WithLoader";
import classNames from "classnames";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  disabled = false,
  ...props
}) => {
  let buttonClasses = classNames("button", `button_color-${color}`, className, {
    button_disabled: loading || disabled,
  });

  return (
    <button {...props} className={buttonClasses} disabled={loading || disabled}>
      <WithLoader loading={loading}>{children}</WithLoader>
    </button>
  );
};

export default Button;
