import { useCheckUsername } from "@/hooks/useCheckUsername";
import styles from "./CheckUsername.module.css";
import { useTranslations } from "next-intl";

interface CheckUsernameProps {
  username: string;
  intiUsername?: string;
  onAvailabilityChange: (isAvailable: boolean | null) => void;
}

export default function CheckUsername({
  username,
  intiUsername,
  onAvailabilityChange,
}: CheckUsernameProps) {
  const translate = useTranslations("CheckUsername");
  const { isAvailable, isChecking } = useCheckUsername(
    username,
    onAvailabilityChange
  );

  return (
    <div className={styles.checkUsernameWrapper}>
      <div className={styles.checkUsername}>
        {isChecking && (
          <div>
            <div className={styles.spinner} />
            {translate("Checking")}
          </div>
        )}
        {isAvailable !== null &&
          !isChecking &&
          username != "" &&
          intiUsername != username &&
          (isAvailable ? (
            <div className={styles.available}>{username} {translate("Is Available")}</div>
          ) : (
            <div className={styles.notAvailable}>
              {username} {translate("Is Already Exist")}
            </div>
          ))}
      </div>
    </div>
  );
}
