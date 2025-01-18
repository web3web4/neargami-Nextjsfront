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
import { UserProfileData , CoursesResponse } from "@/interfaces/api";
import { useEffect, useState } from "react";
import CoursesList from "./CourseList/CoursesList";


interface ProfileDetailsProps {
  playerId: string | null;
  data: UserProfileData;
  courses?:CoursesResponse[];
}

const ProfileDetails = ({ playerId, data , courses  } : ProfileDetailsProps) => {
  const [filterCourses, setFilterCourses] = useState<CoursesResponse[]>([]);

  const {
    balance,
    isCopied,
    loading,
    progress,
    formatAddress,
    handleCopy,
    handleClaims,
  } = useProfileDetails(playerId);

  useEffect(() => {
    if (courses) {
      const approvedCourses = courses.filter(
        (course) => course.publish_status === "APPROVED"
      );
      setFilterCourses(approvedCourses);
    } else {
      setFilterCourses([]);
    }
  }, [courses]);
  

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
                  <strong>NearGami Coins:</strong>{" "}
                  <span>
                    {data.ngc}
                    <Image
                      src={pointIcon}
                      width={20}
                      alt="Info Icon"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Your current balance of off-chain tokens ready for use within our website's online game environment."
                      className={styles.infoIcon}
                    />
                  </span>
                </li>
                <li style={{ position: "relative" }}>
                  <strong>Top Points:</strong>{" "}
                  <span>
                    {data.top_points}
                    <Image
                      src={pointIcon}
                      width={20}
                      alt="Info Icon"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="The cumulative number of coins you've earned since joining our service."
                      className={styles.infoIcon}
                    />
                  </span>
                </li>
                {!playerId && (
                  <>
                    <li style={{ position: "relative" }}>
                      <strong>Tokens In Your Wallet:</strong>{" "}
                      <span>
                        {balance}
                        <Image
                          src={pointIcon}
                          width={20}
                          alt="Info Icon"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Tokens exist at your NEAR wallet on-chain."
                          className={styles.infoIcon}
                        />
                      </span>
                    </li>
                    <li style={{ position: "relative" }}>
                      <strong>Claimed Token:</strong>{" "}
                      <span>
                        {data.ngc_claimed}
                        <Image
                          src={pointIcon}
                          width={20}
                          alt="Info Icon"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="will be transferred to your wallet soon."
                          className={styles.infoIcon}
                        />
                      </span>
                    </li>
                  </>
                )}
                <li>
                  <strong>Player Country:</strong> <span>{data.country}</span>
                </li>
                <li>
                  <strong>Email:</strong> <span>{data.email}</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong>Address:</strong>
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
                  <strong>Social:</strong>
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
              <div className="mt-3 mb-3">
                {!playerId  && (
                  <>
                    <Button
                      href="/edit-profile"
                      variant="mint"
                      size="md"
                      className="banner-btn"
                    >
                      Edit Profile
                    </Button>
                    <div className="mt-2">
                      <Button
                        variant="blue"
                        size="md"
                        className="banner-btn"
                        onClick={handleClaims}
                      >
                        Claim Coins
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </LoadingWrapper>
          </div>
          <div className="col-md-8" style={{ marginTop: "-43px" }}>
            <div className={styles.rightContent}>
              <h2 className={styles.rightContentTitle}>Near Land</h2>
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
                          Loading... {Math.round(progress * 100)}%
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
        
        {courses && (
          <>
            <h2 className={styles.rightContentTitle}>Courses Offered</h2>
            <div className="row">
              {filterCourses && filterCourses.length > 0 ? (
                filterCourses.map((filteredCourse, i) => (
                  <div key={i} className="col-lg-4 col-md-6">
                    <CoursesList {...filteredCourse} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p className={styles.sectionCourses}>There are no courses published yet.</p>
                </div>
              )}
            </div>
          </>
        )}


      </div>

    </div>
  );
};

export default ProfileDetails;
