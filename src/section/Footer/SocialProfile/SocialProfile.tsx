import { SectionTitle } from "@/components/sectionTitle/SectionTitle";
import styles from "./SocialProfile.module.css";
import data from "@/assets/data/social/dataV1";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Social = () => {
    const translate = useTranslations("Footer");
  
  return (
    <div className={styles.social_wrapper}>
      <div className="container">
        <SectionTitle isCenter={true} subtitle={translate("FIND US ON SOCIAL")} />
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
