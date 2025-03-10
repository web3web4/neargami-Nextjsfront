export const debounce = function (
  functionToDebounce: (...args: any[]) => void,
  delay: number
) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => functionToDebounce(...args), delay);
  };
};

export const extractTextFromHTML = (htmlString: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};

export const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};