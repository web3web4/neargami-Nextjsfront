"use client";
import { updateCourseStatus } from "@/apiService";
import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CardButtons({
  id,
  publish_status,
  slug,
  style,
}: {
  id: number;
  publish_status: string;
  slug: string;
  style: string;
}) {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectDescription, setRejectDescription] = useState("");
  const translate = useTranslations("TeacherDashboard");

  const handleReject = () => {
    setShowRejectInput(true);
  };

  const handleApprove = async (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    const data = {
      publish_status: "APPROVED",
    };
    try {
      const updateStatus = await updateCourseStatus(data, id);
      if (updateStatus.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course is successfully approve.!",
        });
      }
    } catch (error) {
      console.error("Error in creating course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again or contact with support.",
      });
    }
  };

  const handleSubmitReject = async (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    const data = {
      publish_status: "REJECTED",
      publish_status_reson: rejectDescription,
    };
    try {
      const updateStatus = await updateCourseStatus(data, id);
      if (updateStatus.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course is successfully reject.!",
        });
      }
    } catch (error) {
      console.error("Error in creating course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again or contact with support.",
      });
    }
  };

  return (
    <div className={style}>
      <Button
        variant="mint"
        size="sm"
        href={`/course-info/${slug}`}
        style={{ marginRight: "10px" }}
      >
        {translate("Edit")}
      </Button>
      {publish_status.toUpperCase() !== "REJECTED" && (
        <Button
          variant="dark"
          size="sm"
          onClick={handleReject}
          style={{ marginRight: "10px" }}
        >
          {translate("Reject")}
        </Button>
      )}
      {publish_status.toUpperCase() !== "APPROVED" && (
        <Button variant="mint" size="sm" onClick={handleApprove}>
          {translate("Approve")}
        </Button>
      )}

      {showRejectInput && (
        <div>
          <input
            type="text"
            placeholder="Enter rejection reason"
            value={rejectDescription}
            onChange={(e) => setRejectDescription(e.target.value)}
          />
          <Button variant="blue" size="sm" onClick={handleSubmitReject}>
            {translate("Submit")}
          </Button>
        </div>
      )}
    </div>
  );
}
