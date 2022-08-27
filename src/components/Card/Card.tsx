import style from "./Card.module.scss";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  price: React.ReactNode;
  category: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  price,
  category,
  onClick,
}) => {
  return (
    <div className={style.card} onClick={onClick}>
      <img className={style.img} alt="" src={image} />
      <div className={style.info}>
        <div className={style.category}>{category}</div>
        <div className={style.title}>{title}</div>
        <div className={style.price}>${price}</div>
      </div>
    </div>
  );
};

export default Card;
