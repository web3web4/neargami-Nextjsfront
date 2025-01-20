"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BadRequestPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code") || "Unknown";
  const errorMessage = searchParams.get("message") || "An unexpected error occurred.";

  return (
    <div style={{ textAlign: "center", marginTop: "15%" }}>
      <h1 style={{ fontSize: "72px", color: "#ff6347" }}>😢</h1>
      <h2>Error {errorCode}</h2>
      <p>{errorMessage}</p>
      <Link href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
        Go back to the homepage
      </Link>
    </div>
  );
}
