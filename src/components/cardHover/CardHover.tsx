import React from "react";
import CardHoverStyles from "./CardHover.module.css";

interface CardHoverProps {
  hovered?: boolean | null;
  styles?: any;
}

const CardHover = ({ hovered, styles }: CardHoverProps) => {
  const cardStyle = hovered ? CardHoverStyles : styles;
  return (
    <div
      className={`${cardStyle.cardHoverWrapper} ${
        hovered ? CardHoverStyles.cardHoverWrapperHovered : ""
      }`}
    >
      <span
        className={`${CardHoverStyles.hoverShape} ${CardHoverStyles.hoverShape1}`}
      ></span>
      <span
        className={`${CardHoverStyles.hoverShape} ${CardHoverStyles.hoverShape2}`}
      ></span>
      <span
        className={`${CardHoverStyles.hoverShape} ${CardHoverStyles.hoverShape3}`}
      ></span>
      <span
        className={`${CardHoverStyles.hoverShape} ${CardHoverStyles.hoverShape4}`}
      ></span>
    </div>
  );
};

export default CardHover;
