"use client";
import { getCurrentNgcs } from "@/apiService";
import { NgcResponse } from "@/interfaces/api";
import { useEffect, useState } from "react";

export default function NGCToken() {
  const [points, setPoints] = useState<NgcResponse>();

  useEffect(() => {
    const getCurrNgcs = async () => {
      try {
        const result = await getCurrentNgcs();
        if (result) {
          setPoints(result);
        }
      } catch (error) {
        console.log(error);
      }

    };

    getCurrNgcs();
  }, []);

  return <div>{points?.toString()}</div>;
}
