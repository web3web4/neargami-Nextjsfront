"use client"
import { useEffect } from "react";
import { Button } from "@/components";
import { useTranslations } from "next-intl";
import { HeaderV1 } from "@/section";

export default function GlobalError({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  const translate = useTranslations("Error");

  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <>
      <HeaderV1 />
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        <h1 style={{ fontSize: "72px", color: "#ff6347" }}>🚧</h1>
        <h2>{translate("The Request is Currently Unavailable")}</h2>
        <p>{translate("We are working on development")}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button href="/" variant="mint" size="md">
            {translate("Go To Home")}
          </Button>
        </div>

      </div>
    </>
  );
}
