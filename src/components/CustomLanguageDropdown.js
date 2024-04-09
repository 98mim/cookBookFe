import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "flowbite-react";
import ReactCountryFlag from "react-country-flag";

const customLanguageDropdown = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const selectedLanguage = i18n.language === "en" ? "us" : "sk";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={"mr-2"}>
      <Dropdown
        pill
        outline
        gradientDuoTone="purpleToPink"
        label={<ReactCountryFlag countryCode={selectedLanguage} />}
      >
        <Dropdown.Item key={"en"} onClick={() => changeLanguage("en")}>
          <ReactCountryFlag countryCode={"us"} /> {t("Language.en")}
        </Dropdown.Item>
        <Dropdown.Item key={"en"} onClick={() => changeLanguage("sk")}>
          <ReactCountryFlag countryCode={"sk"} /> {t("Language.sk")}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default customLanguageDropdown;
