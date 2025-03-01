export const debounce = function (functionToDebounce: (...args: any[]) => void, delay: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => functionToDebounce(...args), delay);
    };
  };
  
  export const HandleMessageError = (error: any): string => {
    let errorMessage = "Unknown error";
    if (typeof error.message === "string") {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }
    return errorMessage;
  };

  export const checkErrorStatus = (error: any): number => {
    const parsedError = JSON.parse(error.message);
    return parsedError.status;
  };

