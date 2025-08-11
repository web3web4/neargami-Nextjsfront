"use client";
import CountrySelector from "@/components/countrySelector/CountrySelector";
import Button from "@/components/button/Button";
import fbIcon from "@/assets/images/icons/facebook.svg";
import linkedIcon from "@/assets/images/icons/linkedin.svg";
import twitterIcon from "@/assets/images/icons/twitter.svg";
import discordIcon from "@/assets/images/icons/discord.svg";
import userDefault from "@/assets/images/no-User.png";
import LoadingWrapper from "@/components/loading/loadingWrapper/LoadingWrapper";
import styles from "./EditProfileDetails.module.css";
import Image from "next/image";
import CropImage from "@/components/cropImage/CropImage";
import { useEditProfile } from "@/hooks/useEditProfile";
import { UserProfileResponse } from "@/interfaces/api";
import CheckUsername from "@/components/checkUsername/CheckUsername";
import { useTranslations } from "next-intl";
interface EditProfile {
  data: UserProfileResponse;
}

const EditProfileDetails = ({ data }: EditProfile) => {
  const translate = useTranslations("Profile");
  const {
    initUsername,
    fileInputRef,
    formInput,
    handleCountryChange,
    handleInputChange,
    handleCroppedImage,
    handleButtonClick,
    handleSubmit,
    setCheckUsernameDetails,
  } = useEditProfile(data);

  return (
    <LoadingWrapper>
      <CropImage
        fileInputRef={fileInputRef}
        onCropComplete={handleCroppedImage}
      />

      <div className={styles.EditProfileDetailsStyleWrapper}>
        <div className={styles.container}>
          <div className={styles.editProfileContent}>
            <div className={styles.leftContent}>
              <div className={styles.leftContentThumb}>
                <Image
                  src={formInput.image || userDefault.src}
                  alt="player-image"
                  width={200}
                  height={200}
                  className={styles.playerImage}
                  onError={() => (formInput.image = userDefault.src)}
                />
              </div>
              <div className={styles.leftContentButt}>
                <Button
                  variant="white"
                  size="cust"
                  className={styles.bannerBtn}
                  onClick={handleButtonClick}
                >
                  {translate("Upload Photo")}
                </Button>
                <h5 className={`${styles.mt2} ${styles.mb2}`}>
                  {translate("OR")}
                </h5>
                <Button
                  href="/edit-profile"
                  variant="white"
                  size="cust"
                  className={styles.bannerBtn}
                >
                  {translate("Select Avatar")}
                </Button>
              </div>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.rightContentSection1}>
                <h4 className={styles.mb3}>{translate("Account Info")}</h4>
                <div>
                  <h6 className={styles.h6}>{translate("First Name")}</h6>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className={styles.input}
                    placeholder={translate("Enter your first name")}
                    value={formInput.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>{translate("Last Name")}</h6>
                  <input
                    type="text"
                    id="lastname"
                    className={styles.input}
                    placeholder={translate("Enter your last name")}
                    value={formInput.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>{translate("Email")}</h6>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    placeholder={translate("Enter your email")}
                    value={formInput.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>{translate("Country")}</h6>
                  <div className={styles.selector}>
                    <CountrySelector
                      value={formInput.country}
                      onChange={handleCountryChange}
                      style={{
                        singleValue: (base) => ({
                          ...base,
                          color: "#84858d",
                        }),
                        control: (base) => ({
                          ...base,
                          backgroundColor: "transparent",
                          width: "90%",
                          border: "2px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "10px",
                        }),
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h6 className={styles.h6}>{translate("Username")}</h6>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={styles.input}
                    placeholder={translate("Enter your Username")}
                    value={formInput.username}
                    onChange={handleInputChange}
                  />
                  <CheckUsername
                    username={formInput.username!}
                    intiUsername={initUsername}
                    onAvailabilityChange={setCheckUsernameDetails}
                  />
                </div>
              </div>
              <div className={styles.rightContentSection2}>
                <h4 className={styles.mb3}>{translate("Social Media Info")}</h4>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={discordIcon} alt="icon" />{" "}
                    {translate("Discord")}
                  </h6>
                  <input
                    type="text"
                    id="discord"
                    className={styles.input}
                    placeholder={translate("Discord user name or link")}
                    value={formInput.discord}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={fbIcon} alt="icon" /> {translate("Facebook")}
                  </h6>
                  <input
                    type="text"
                    id="facebook"
                    className={styles.input}
                    placeholder={translate("Facebook profile link")}
                    value={formInput.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={twitterIcon} alt="icon" />{" "}
                    {translate("Twitter")}
                  </h6>
                  <input
                    type="text"
                    id="twitter"
                    className={styles.input}
                    placeholder={translate("Twitter profile link")}
                    value={formInput.twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={linkedIcon} alt="icon" />
                    {translate("Linkedin")}
                  </h6>
                  <input
                    type="text"
                    id="linkedin"
                    className={styles.input}
                    placeholder={translate("Linkedin profile link")}
                    value={formInput.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.checkBoxContainer}>
                    <input
                      type="checkbox"
                      name="sendMail"
                      id="sendMail"
                      checked={formInput.sendMail}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <label className={styles.label}>
                      {translate("Receive Email For The Latest Updates")}
                    </label>
                  </div>
              </div>
            </div>
          </div>
          <div className={`${styles.btu}`}>
            <Button variant="mint" size="cust" onClick={handleSubmit}>
              {translate("Save Changes")}
            </Button>
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default EditProfileDetails;
