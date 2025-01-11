import { SectionTitle } from "@/components/sectionTitle/SectionTitle";
import styles from "./SocialProfile.module.css";
import data from "@/assets/data/social/dataV1";
import Image from "next/image";

const Social = () => {
  return (
    <div className={styles.social_wrapper}>
      <div className="container">
        <SectionTitle isCenter={true} subtitle="FIND US ON SOCIAL" />
        <div className={styles.social_link_list}>
          {data?.map((profile, i) => (
            <a
              key={i}
              href={profile.url}
              style={{ boxShadow: "0 0 15px white" }}
            >
              <Image src={profile.icon} alt="social icon" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
