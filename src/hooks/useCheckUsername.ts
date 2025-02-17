import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/utils/functions";
import { checkUsernameIsAvailable } from "@/apiService";

export function useCheckUsername(
  username: string,
  onAvailabilityChange: (isAvailable: boolean | null) => void,
  intiUsername: string = ""
) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      setIsChecking(true);
      try {
        const available = await checkUsernameIsAvailable(username);
        setIsAvailable(available);
        onAvailabilityChange(available);
      } catch {
        onAvailabilityChange(false);
        setIsAvailable(false);
      } finally {
        setIsChecking(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (username.trim() !== "" && intiUsername !== username) {
      checkUsername(username);
    } else {
      setIsAvailable(null);
      setIsChecking(null);
      onAvailabilityChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return { isAvailable, isChecking, checkUsername };
}
