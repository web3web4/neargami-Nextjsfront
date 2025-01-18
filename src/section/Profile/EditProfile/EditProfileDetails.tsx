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

interface EditProfile {
  data:UserProfileResponse
}

const EditProfileDetails = ({data }:EditProfile) => {
  console.log("Data received in EditProfileDetails:", data);


  const {
    fileInputRef,
    formInput,
    //image,
    handleCountryChange,
    handleInputChange,
    handleCroppedImage,
    handleButtonClick,
    handleSubmit,
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
                  Upload Photo
                </Button>
                <h5 className={`${styles.mt2} ${styles.mb2}`}>OR</h5>
                <Button
                  href="/edit-profile"
                  variant="white"
                  size="cust"
                  className={styles.bannerBtn}
                >
                  Select Avatar
                </Button>
              </div>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.rightContentSection1}>
                <h4 className={styles.mb3}>Account Info</h4>
                <div>
                  <h6 className={styles.h6}>First Name</h6>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className={styles.input}
                    placeholder="Enter your first name"
                    value={formInput.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>Last Name</h6>
                  <input
                    type="text"
                    id="lastname"
                    className={styles.input}
                    placeholder="Enter your last name"
                    value={formInput.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>Email</h6>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    placeholder="Enter your email"
                    value={formInput.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>Country</h6>
                  <div id={styles.selector}>
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
              </div>
              <div className={styles.rightContentSection2}>
                <h4 className={styles.mb3}>Social Media Info</h4>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={discordIcon} alt="icon" /> Discord
                  </h6>
                  <input
                    type="text"
                    id="discord"
                    className={styles.input}
                    placeholder="Discord user name or link"
                    value={formInput.discord}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={fbIcon} alt="icon" /> Facebook
                  </h6>
                  <input
                    type="text"
                    id="facebook"
                    className={styles.input}
                    placeholder="Facebook profile link"
                    value={formInput.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={twitterIcon} alt="icon" /> Twitter
                  </h6>
                  <input
                    type="text"
                    id="twitter"
                    className={styles.input}
                    placeholder="Twitter profile link"
                    value={formInput.twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6 className={styles.h6}>
                    <Image src={linkedIcon} alt="icon" /> Linkedin
                  </h6>
                  <input
                    type="text"
                    id="linkedin"
                    className={styles.input}
                    placeholder="Linkedin profile link"
                    value={formInput.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.mt3} ${styles.btu}`}>
            <Button variant="mint" size="cust" onClick={handleSubmit}>
              Save Change
            </Button>
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default EditProfileDetails;
