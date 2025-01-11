"use client";
import React, { useEffect, useState } from "react";
import customer from "@/assets/images/icons/customer.png";
import Image from "next/image";
import { getAllRatingForCourse } from "@/lib/nearContractRating";
import styles from "./TotalRating.module.css";
import { RatingObject } from "@/interfaces/contracts";

interface TotalRating {
  courseId: number;
  totalRatingStyle?: string;
  starsRatingStyle?: string;
  countRatingStyle?: string;
}

export default function TotalRating({
  courseId,
  totalRatingStyle,
  starsRatingStyle,
  countRatingStyle,
}: TotalRating) {
  const [averageRating, setAverageRating] = useState(0);
  const [ratings, setRatings] = useState<RatingObject[] | undefined>([]);

  // Here Get Rating For Course
  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const id = courseId && courseId.toString();
        const resault: RatingObject[] | undefined = await getAllRatingForCourse(
          id.toString()
        );
        // Here Get Rating Count
        
          setRatings(resault);
        
        if (resault && resault.length > 0) {
          const totalRate = resault.reduce(
            (acc: any, item: any) => acc + item.rate,
            0
          );
          const avgRate = totalRate / resault.length;
          // Here Get Avg
          setAverageRating(avgRate);
        }
      } catch {}
    };

    fetchAvgRating();
  }, [courseId]);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={styles.starsGray}>
          ★
          {i <= Math.floor(averageRating) && (
            <span className={styles.startsGold}>★</span>
          )}
          {i - 1 === Math.floor(averageRating) && averageRating % 1 > 0 && (
            <span
              className={styles.startsLinear}
              style={{
                width: `${(averageRating % 1) * 100}%`,
              }}
            >
              ★
            </span>
          )}
        </span>
      );
    }

    return stars;
  };

  return (
    <div className={totalRatingStyle}>
      <span className={starsRatingStyle}>{renderStars()}</span>{" "}
      <span className={countRatingStyle}>
        {" "}
        <Image src={customer} width="25" alt="course logo" />
        {ratings && ratings.length > 0 ? ratings.length : 0}
      </span>
    </div>
  );
}
