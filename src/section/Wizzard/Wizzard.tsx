"use client";
import React, { Fragment, useState } from "react";
import ProgressBar from "@/components/progressBar/v2/ProgressBar";
import Button from "@/components/button/Button";
import CountrySelector from "@/components/countrySelector/CountrySelector";
import banner from "@/assets/images/banner-bg.jpg";
import land from "@/assets/images/Land.png";
import styles from "./Wizzard.module.css";
import Image from "next/image";
import { useWizard } from "@/hooks/useWizard";
import PlayerListPopup from "@/components/PlayerListPopup/PlayerListPopup";
import CheckUsername from "@/components/checkUsername/CheckUsername";
import { useTranslations } from "next-intl";

const Wizard = () => {
  const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const translate = useTranslations("Wizard");
  const {
    step,
    formInput,
    isAccepted,
    descriptionpopup,
    handleNext,
    handlePrev,
    handleBackToHome,
    handleInputChange,
    handleCountryChange,
    handleCheckboxChange,
    handleComplateToProfile,
    setIsUsernameAvailable,
  } = useWizard();

  return (
    <Fragment>
      <PlayerListPopup
        open={showStartPopup}
        onClose={() => setShowStartPopup(false)}
        title={translate("Terms and conditions")}
        fetchPlayers={null}
        description={descriptionpopup}
      />
      <div className={styles.Wizard}>
        <div className={styles.WizardLogo}>
          <Image src={banner} alt="" />
          <Image src={land} alt="" />
        </div>
        <div className={styles.WizardContent}>
          <div className={styles.Content}>
            <ProgressBar progress={`${step * 50}%`} />
            <div className={styles.WizardSubText}>{step}/2</div>
            <form>
              {step === 1 && (
                <div className={styles.formDiv}>
                  <div className={styles.stepTitle}>
                    {translate("Please fill with your details")}
                  </div>
                  <div>
                    <input
                      type="text"
                      id="username"
                      placeholder={translate("Username")}
                      className={styles.formControl}
                      value={formInput.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <CheckUsername
                    username={formInput.username}
                    onAvailabilityChange={setIsUsernameAvailable}
                  />
                  <div>
                    <input
                      type="text"
                      id="firstname"
                      placeholder={translate("First Name")}
                      className={styles.formControl}
                      value={formInput.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastname"
                      placeholder={translate("Last Name")}
                      className={styles.formControl}
                      value={formInput.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      placeholder={translate("Your Email")}
                      className={styles.formControl}
                      value={formInput.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div id="selector">
                    <CountrySelector
                      onChange={handleCountryChange}
                      value={formInput.country}
                    />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="accept"
                      value="accept"
                      checked={isAccepted}
                      onChange={handleCheckboxChange}
                      className={styles.checkbox}
                    />
                    <label className={styles.label}>
                      {translate("Please accept our")}{" "}
                      <span>
                        <a href="#" onClick={() => setShowStartPopup(true)}>
                          {translate("Terms and conditions")}
                        </a>
                      </span>{" "}
                    </label>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className={styles.formDiv}>
                  <div className={styles.stepTitle}>{translate("Summary")}</div>
                  <div className={styles.subTitle} data-number="1">
                    {translate("Personal Details")}
                  </div>
                  <span className={styles.subTitleContent}>
                    {translate("Username")}:{" "}
                  </span>
                  <span className={styles.WizardSubText}>
                    {formInput.username}
                  </span>
                  <br />
                  <span className={styles.subTitleContent}>
                    {translate("First Name")}:{" "}
                  </span>
                  <span className={styles.WizardSubText}>
                    {formInput.firstname}
                  </span>
                  <br />
                  <span className={styles.subTitleContent}>
                    {translate("Last Name")}:{" "}
                  </span>
                  <span className={styles.WizardSubText}>
                    {formInput.lastname}
                  </span>
                  <br />
                  <span className={styles.subTitleContent}>
                    {translate("Email")}:{" "}
                  </span>
                  <span className={styles.WizardSubText}>
                    {formInput.email}
                  </span>
                  <br />
                  <span className={styles.subTitleContent}>
                    {translate("Country")}:{" "}
                  </span>
                  <span className={styles.WizardSubText}>
                    {formInput.country}
                  </span>
                  <br />
                  <br />
                </div>
              )}
              <hr />

              <div className={styles.button}>
                {step === 1 && (
                  <>
                    <Button size="sm" variant="white" href={"/"}>
                      {translate("Skip")}
                    </Button>

                    <Button size="sm" variant="mint" onClick={handleNext}>
                      {translate("Next")}
                    </Button>
                  </>
                )}
                {step > 1 && (
                  <>
                    <Button size="md" variant="white" onClick={handlePrev}>
                      {translate("Prev")}
                    </Button>
                    <Button
                      size="lg"
                      variant="blue"
                      onClick={handleComplateToProfile}
                    >
                      {translate("Complate To Profile")}
                    </Button>
                    <Button size="lg" variant="mint" onClick={handleBackToHome}>
                      {translate("Back To Home")}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Wizard;
