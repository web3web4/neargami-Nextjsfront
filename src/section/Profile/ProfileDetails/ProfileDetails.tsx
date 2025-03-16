"use client";
import userDefault from "@/assets/images/no-User.png";
import { useProfileDetails } from "@/hooks/useProfileDetails";
import fbIcon from "@/assets/images/icons/facebook.svg";
import linkedIcon from "@/assets/images/icons/linkedin.svg";
import twitterIcon from "@/assets/images/icons/twitter.svg";
import discordIcon from "@/assets/images/icons/discord.svg";
import logo from "@/assets/images/brand/Logo/Without-BG/Logo-3.png";
import Button from "@/components/button/Button";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import pointIcon from "@/assets/images/icons/point-info.png";
import LoadingWrapper from "@/components/loading/loadingWrapper/LoadingWrapper";
import Image from "next/image";
import styles from "./ProfileDetails.module.css";
import { CoursesResponse, UserProfileData } from "@/interfaces/api";
import { useTranslations } from "next-intl";
import Tabs from "./Tabs/Tabs";

interface ProfileDetailsProps {
  username: string | null;
  data: UserProfileData;
  courses?: CoursesResponse[];
}

const ProfileDetails = ({ username, data, courses }: ProfileDetailsProps) => {
  const translate = useTranslations("Profile");
  const {
    balance,
    isCopied,
    loading,
    progress,
    formatAddress,
    handleCopy,
    handleClaims,
  } = useProfileDetails(username, data);

  return (
    <div className={styles.ProfileDetailsStyleWrapper}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`col-md-4 ${styles.leftContent}`}>
            <LoadingWrapper>
              <div className={styles.leftContentThumb}>
                <Image
                  src={data.image || userDefault.src}
                  alt="player-image"
                  width={200}
                  height={200}
                  className={styles.playerImage}
                  onError={() => (data.image = userDefault.src)}
                />
              </div>
              <h2>
                {data.firstname} {data.lastname}
              </h2>

              <ul className={styles.memberDetails}>
                <li>
                  <strong>{translate("NearGami Coins")}</strong>{" "}
                  <span>
                    {data.ngc}
                    <Image
                      src={pointIcon}
                      width={20}
                      alt="Info Icon"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={translate("NearGamiCoinsTooltip")}
                      className={styles.infoIcon}
                    />
                  </span>
                </li>
                <li style={{ position: "relative" }}>
                  <strong>{translate("Top Points")}</strong>{" "}
                  <span>
                    {data.top_points}
                    <Image
                      src={pointIcon}
                      width={20}
                      alt="Info Icon"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={translate("TopPointsTooltip")}
                      className={styles.infoIcon}
                    />
                  </span>
                </li>
                {!username && (
                  <>
                    <li style={{ position: "relative" }}>
                      <strong>{translate("Tokens In Your Wallet")}</strong>{" "}
                      <span>
                        {balance}
                        <Image
                          src={pointIcon}
                          width={20}
                          alt="Info Icon"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={translate(
                            "TokensInYourWalletToolTip"
                          )}
                          className={styles.infoIcon}
                        />
                      </span>
                    </li>
                    <li style={{ position: "relative" }}>
                      <strong>{translate("Claimed Token")}</strong>{" "}
                      <span>
                        {data.ngc_claimed}
                        <Image
                          src={pointIcon}
                          width={20}
                          alt="Info Icon"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={translate(
                            "ClaimedTokenTooltip"
                          )}
                          className={styles.infoIcon}
                        />
                      </span>
                    </li>
                  </>
                )}
                <li>
                  <strong>{translate("Player Country")}</strong>{" "}
                  <span>{data.country}</span>
                </li>
                <li>
                  <strong>{translate("Email")}</strong>{" "}
                  <span>{data.email}</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong>{translate("Address")}</strong>
                  <span>
                    {data.address ? formatAddress(data.address) : "N/A"}
                  </span>
                  {data.address && (
                    <button
                      onClick={handleCopy}
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: "#00ec97",
                        color: "Black",
                        borderRadius: "5px",
                        fontFamily: "Russo One",
                      }}
                    >
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                  )}
                </li>
                <Tooltip
                  id="my-tooltip"
                  place="top"
                  style={{
                    maxWidth: "300px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                />
                <li className={styles.socialItems}>
                  <strong>{translate("Social")}</strong>
                  <a href={data.discord}>
                    <Image src={discordIcon} alt="icon" />
                  </a>
                  <a href={data.twitter}>
                    <Image src={twitterIcon} alt="icon" />
                  </a>
                  <a href={data.facebook}>
                    <Image src={fbIcon} alt="icon" />
                  </a>
                  <a href={data.linkedin}>
                    <Image src={linkedIcon} alt="icon" />
                  </a>
                </li>
              </ul>
              <div className={styles.btn}>
                {!username && (
                  <>
                    <div className="mt-2 mb-3">
                      <Button href="/edit-profile" variant="mint" size="md" disabled={loading}>
                        {translate("Edit Profile")}
                      </Button>
                    </div>
                    <div className="mt-2 mb-3">
                      <Button variant="blue" size="md" onClick={handleClaims} disabled={loading}>
                        {translate("Claim Coins")}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </LoadingWrapper>
          </div>
          <div className="col-md-8" style={{ marginTop: "-20px" }}>
            <div className={styles.rightContent}>
              <h2 className={styles.rightContentTitle}>
                {translate("Near Land")}
              </h2>
              <div className={styles.imgNearLand}>
                <div
                  id="unity-container"
                  className={styles.unityDesktop}
                  style={{ height: "auto", position: "relative" }}
                >
                  {/* Unity content */}

                  <div
                    id="unity-container"
                    className="unity-desktop"
                    style={{ height: "auto", position: "relative" }}
                  >
                    <canvas
                      id="unity-canvas"
                      width="960"
                      height="600"
                      style={{
                        width: "800px",
                        height: "550px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    ></canvas>

                    {loading && (
                      <div className={styles.unityLoadingOverlay}>
                        <div className={styles.loadingLogo}>
                          <Image src={logo} alt="Loading Logo" />
                        </div>
                        <div className={styles.loadingText}>
                          {translate("Loading")}
                          {Math.round(progress * 100)}%
                        </div>
                      </div>
                    )}

                    <div id="unity-loading-bar" style={{ display: "none" }}>
                      <div id="unity-logo"></div>
                      <div id="unity-progress-bar-empty">
                        <div
                          id="unity-progress-bar-full"
                          style={{ width: `${progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div id="unity-warning"></div>
                    <div id="unity-footer">
                      <div id="unity-logo-title-footer"></div>
                      <div id="unity-fullscreen-button"></div>
                      <div id="unity-build-title"></div>
                    </div>
                  </div>
                  {/* Include Unity styles */}
                  <link href="/citybuilder/TemplateData/style.css" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {username && (
          <Tabs
            offeredCourses={courses}
            finishedCourses={data.completedCourses}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
