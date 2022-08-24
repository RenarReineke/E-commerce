export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <img alt="" src={image} />
      <div>{title}</div>
      <div>{subtitle}</div>
      <div>{content}</div>
    </div>
  );
};

export default Card;
