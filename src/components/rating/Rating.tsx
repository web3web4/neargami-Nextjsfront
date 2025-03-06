import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/button/Button";
import styles from "./Rating.module.css";
import { addRating, getOldRatingForUser } from "@/lib/nearContractRating";
import Swal from "sweetalert2";

interface RatinfProps {
  courseId: number;
  closed: Dispatch<SetStateAction<boolean>>;
}

const Rating = ({ courseId, closed }: RatinfProps) => {
  const [rating, setRating] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  const handleClick = (rate: number) => {
    setRating(rate);
  };

  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const result = await getOldRatingForUser(courseId.toString());
        setRating(result.rate);
        setMessage(result.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvgRating();
  }, [courseId]);

  const handleRating = () => {
    const submitRating = async () => {
      try {
        const result = await addRating(rating, courseId.toString(), message);
        if (Array.isArray(result) && result.length > 0) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Thank you for rating the course. Your feedback has been saved.",
          });
          closed(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    submitRating();
  };

  return (
    <div className={styles.content}>
      <div className={styles.startsContainer}>
        {[...Array(5)].map((_, index) => {
          return (
            <div
              className={styles.star}
              key={index}
              style={{
                color: index < rating ? "gold" : "white",
              }}
              onClick={() => handleClick(index + 1)}
            >
              ★
            </div>
          );
        })}
      </div>
      <div className={styles.message}>
        <h4 className="mb-3">Message</h4>

        <input
          type="text"
          className={styles.messageSearchInput}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className={styles.btnRating}>
        <Button variant="white" size="sm" onClick={() => closed(false)}>
          Cancel
        </Button>
        <Button variant="mint" size="sm" onClick={() => handleRating()}>
          Ok
        </Button>
      </div>
    </div>
  );
};

export default Rating;
