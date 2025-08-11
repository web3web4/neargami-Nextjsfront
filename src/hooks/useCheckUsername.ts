"use client";
import {
  useState,
  useCallback,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { debounce } from "@/utils/functions";
import { checkUsernameIsAvailable } from "@/apiService";
import { CheckUsernameDetailsType } from "@/interfaces/component";

export function useCheckUsername(
  username: string,
  onAvailabilityChange: Dispatch<
    SetStateAction<CheckUsernameDetailsType | null>
  >,
  initUsername: string = ""
) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(true);

  const checkUsernameIsValid = (username: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(username);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (!username.trim()) {
        setIsAvailable(null);
        setIsChecking(null);
        onAvailabilityChange(null);
        setIsValid(null);
        return;
      }
      if (!checkUsernameIsValid(username)) {
        onAvailabilityChange((prev) => ({
          ...prev,
          isAvailable: prev?.isAvailable ?? null,
          isValid: false,
        }));
        setIsValid(false);
        return;
      }
      setIsValid(true);
      setIsChecking(true);
      try {
        const available = await checkUsernameIsAvailable(username);
        setIsAvailable(available);
        onAvailabilityChange((prev) => ({
          ...prev,
          isAvailable: available,
          isValid: true,
        }));
      } catch {
        onAvailabilityChange((prev) => ({
          ...prev,
          isAvailable: false,
          isValid: true,
        }));
        setIsAvailable(false);
      } finally {
        setIsChecking(false);
        setIsValid(true);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (initUsername === username) {
      onAvailabilityChange((prev) => ({
        ...prev,
        isAvailable: true,
        isValid: true,
      }));
      setIsValid(true);
    } else {
      checkUsername(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return { isAvailable, isChecking, isValid, checkUsername };
}
