import React from "react";

interface CharacterCounterProps {
  currentCount: number;
  maxCount: number;
}

const CharacterCounter = ({
  currentCount,
  maxCount,
}: CharacterCounterProps) => {
  return (
    <div className="charCounter">
      {currentCount}/{maxCount}
    </div>
  );
};

export default CharacterCounter;
