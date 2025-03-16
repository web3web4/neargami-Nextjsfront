export const languageOptions = [
  { value: "ar", label: "Arabic" },
  { value: "en", label: "English" },
];

export const customStyles = {
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),

  option: (base: any) => ({
    ...base,
    backgroundColor: "white",
    color: "black !important",
    width: "90%",
  }),

  placeholder: (base: any) => ({
    ...base,
    color: "#bbbbc1",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#bbbbc1",
  }),
  control: (base: any) => ({
    ...base,
    backgroundColor: "transparent",
    width: "90%",
    border: "2px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "10px",
  }),
};
