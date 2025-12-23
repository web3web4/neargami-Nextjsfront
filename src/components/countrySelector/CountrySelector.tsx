"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import countryList from "react-select-country-list";

type CountryData = {
  label: string;
  value: string;
};

interface CountrySelectorProps {
  onChange: (value: SingleValue<CountryData>) => void;
  style?: StylesConfig<CountryData, false>;
  value?: string;
}

const CountrySelector = ({ onChange, style, value }: CountrySelectorProps) => {
  const translate = useTranslations("Wizard");
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryData>>(null);

  const options: CountryData[] = countryList().getData();

  const handleChange = (selectedOption: SingleValue<CountryData>) => {
    setSelectedCountry(selectedOption);
    onChange(selectedOption);
  };

  useEffect(() => {
    if (value) {
      const defaultCountry = options.find(
        (option) => option.label === value || option.value === value
      );
      setSelectedCountry(defaultCountry || null);
    }
  }, [value, options]);

  const customStyles: StylesConfig<CountryData, false> = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    ...style,
    option: (base) => ({
      ...base,
      backgroundColor: "White",
      color: "black",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#84858d",
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={options}
      value={selectedCountry}
      onChange={handleChange}
      placeholder={translate("Country")}
    />
  );
};

export default CountrySelector;
