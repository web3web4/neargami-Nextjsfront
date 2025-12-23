import { useCheckUsername } from "@/hooks/useCheckUsername";
import { useTranslations } from "next-intl";
import { CheckUsernameDetailsType } from "@/interfaces/component";
import { Dispatch, SetStateAction } from "react";
import styles from "./CheckUsername.module.css";

interface CheckUsernameProps {
  username: string;
  intiUsername?: string;
  onAvailabilityChange: Dispatch<
    SetStateAction<CheckUsernameDetailsType | null>
  >;
}

export default function CheckUsername({
  username,
  intiUsername,
  onAvailabilityChange,
}: CheckUsernameProps) {
  const translate = useTranslations("CheckUsername");
  const { isAvailable, isChecking, isValid } = useCheckUsername(
    username,
    onAvailabilityChange,
    intiUsername
  );

  return (
    <div className={styles.checkUsernameWrapper}>
      <div className={styles.checkUsername}>
        {isValid === false && (
          <div className={styles.notAvailable}>
            {username} {translate("Warning Message")}
          </div>
        )}
        {isChecking && (
          <div>
            <div className={styles.spinner} />
            {translate("Checking")}
          </div>
        )}
        {isAvailable !== null &&
          isValid &&
          !isChecking &&
          username != "" &&
          intiUsername != username &&
          (isAvailable ? (
            <div className={styles.available}>
              {username} {translate("Is Available")}
            </div>
          ) : (
            <div className={styles.notAvailable}>
              {username} {translate("Is Already Exist")}
            </div>
          ))}
      </div>
    </div>
  );
}
