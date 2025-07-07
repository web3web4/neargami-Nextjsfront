
import { useTranslations } from "next-intl";
import { FaTelegram, FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa';
import styles from "./Contact.module.css";

const Contact = () => {
  const translate = useTranslations("Contact");
  
  return (
    <div className={styles.container}>
      <div style={{ marginTop: 50 }}>
        <h1>{translate("Contact Us")}</h1>
        
        <section className={styles.introSection}>
          <p>
            {translate(
              "Were here to help Whether you have questions about our platform need technical support or want to provide feedback wed love to hear from you Get in touch with the NearGami team through any of the channels below"
            )}
          </p>
        </section>

        <section className={styles.socialSection}>
          <h2>{translate("Connect with Us")}</h2>
          <p>
            {translate(
              "Follow us on social media for the latest updates announcements and community discussions Join our growing community of Web3 learners"
            )}
          </p>
          
          <div className={styles.socialLinks}>
            <div className={styles.socialItem}>
              <h4><FaTelegram />  {translate("Telegram")}</h4>
              <p>
                {translate("Join our Telegram community for real-time discussions and support")}
                <br />
                <a href={process.env.NEXT_PUBLIC_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                Click Here
                </a>
              </p>
            </div>
            
            <div className={styles.socialItem}>
              <h4><FaLinkedin />  {translate("LinkedIn")}</h4>
              <p>
                {translate("Connect with us on LinkedIn for professional updates")}
                <br />
                <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                Click Here
                </a>
              </p>
            </div>
            
            <div className={styles.socialItem}>
              <h4><FaFacebook />  {translate("Facebook")}</h4>
              <p>
                {translate("Follow us on Facebook for community updates")}
                <br />
                <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                Click Here
                </a>
              </p>
            </div>
            
            <div className={styles.socialItem}>
              <h4><FaGlobe />  {translate("Website")}</h4>
              <p>
                {translate("Visit our main website")}
                <br />
                <a href={process.env.NEXT_PUBLIC_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
                Click Here
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2>{translate("Frequently Asked Questions")}</h2>
          
          <div className={styles.faqItem}>
            <h4>{translate("How do I get started with NearGami")}</h4>
            <p>
              {translate(
                "Simply create an account connect your NEAR wallet and start exploring our courses Begin with our introductory course to familiarize yourself with the platform"
              )}
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h4>{translate("Are the courses free")}</h4>
            <p>
              {translate(
                "Yes NearGami offers free access to our educational content You can learn and earn tokens as you progress through the courses"
              )}
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h4>{translate("What do I need to get started")}</h4>
            <p>
              {translate(
                "Youll need a NEAR wallet to fully participate in the platform Dont worry if you dont have one - well guide you through the setup process"
              )}
            </p>
          </div>
        </section>

        <div className={styles.responseTime}>
          <p>
            <strong>{translate("Response Time")}</strong> {translate("We typically respond to inquiries within 24-48 hours during business days For urgent technical issues please reach out through our Telegram community for faster assistance")}
          </p>
        </div>

        <div className={styles.legalNotice}>
          <p>
            {translate("By contacting us you acknowledge that you have read and agree to our")} <a href="/privacy-policy">{translate("Privacy Policy")}</a> {translate("and")} <a href="/legal-disclaimer">{translate("Legal Disclaimer")}</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;