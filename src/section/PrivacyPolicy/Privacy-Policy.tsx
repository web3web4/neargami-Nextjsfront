import { useTranslations } from "next-intl";
import styles from "./privacy-policy.module.css";

const PrivacyPolicy = () => {
  const translate = useTranslations("PrivacyPolicy");
  return (
    <div className={styles.container}>
      <div style={{ marginTop: 50 }}>
        {translate(
          "By using our service you automatically acknowledge and agree to our Privacy Policy and you acknowledge and agree to our Legal Disclaimer Otherwise please do not use our service"
        )}

        <h1>{translate("Privacy Policy")}</h1>
        <ol>
          <li>
            <strong>{translate("Introduction")}</strong>
            <p>
              {translate(
                "This Privacy Policy explains how NearGami we us or our collects uses and shares personal information of users you of our website"
              )}
              <a href="https://neargami.com">NearGami.com </a>
              {translate("and its associated services like")}
              <a href="https://t.me/NeargamiBot/app">t.me/NearGamiBot/app</a>
            </p>
          </li>
          <li>
            <strong>{translate("Information We Collect")}</strong>
            <ul>
              <li>
                <strong>{translate("Personal Information")}</strong>{" "}
                {translate(
                  "Includes name email address phone number and other contact details"
                )}
              </li>
              <li>
                <strong>{translate("Usage Data")}</strong>{" "}
                {translate(
                  "Information about how you use our website products and services"
                )}
              </li>
              <li>
                <strong>{translate("Device Information")}</strong>{" "}
                {translate(
                  "Information about your computer or mobile device like IP address browser type and operating system"
                )}
              </li>
            </ul>
          </li>
          <li>
            <strong>{translate("How We Use Your Information")}</strong>
            <ul>
              <li>
                {translate("To provide operate and maintain our services")}
              </li>
              <li>
                {translate("To improve personalize and expand our services")}
              </li>
              <li>
                {translate(
                  "To communicate with you either directly or through service providers including for customer service purposes"
                )}
              </li>
              <li>
                {translate(
                  "To send you updates and other information relating to the service"
                )}
              </li>
              <li>{translate("For marketing and promotional purposes")}</li>
            </ul>
          </li>
          <li>
            <strong>{translate("Sharing Your Information")}</strong>
            <ul>
              <li>
                <strong>{translate("Service Providers")}</strong>{" "}
                {translate(
                  "Third-party providers who perform services on our behalf"
                )}
              </li>
              <li>
                <strong>{translate("Business Transfers")}</strong>{" "}
                {translate(
                  "In connection with any merger sale of company assets financing or acquisition of all or a portion of our business"
                )}
              </li>
              <li>
                <strong>{translate("Legal Requirements")}</strong>{" "}
                {translate(
                  "To comply with legal obligations protect our rights and ensure the safety of our users"
                )}
              </li>
            </ul>
          </li>
          <li>
            <strong>{translate("User Rights")}</strong>
            <ul>
              <li>
                <strong>{translate("Access and Correction")}</strong>{" "}
                {translate(
                  "You have the right to access and correct your personal information stored by us"
                )}
              </li>
              <li>
                <strong>{translate("Data Portability")}</strong>{" "}
                {translate(
                  "Receive a copy of your personal data in a structured machine-readable format"
                )}
              </li>
              <li>
                <strong>{translate("Deletion")}</strong>{" "}
                {translate(
                  "We are currently working on implementing the ability for you to request the deletion of your personal information We plan to have this feature available soon In the meantime you can contact us at our official media or our social media channels to discuss any concerns regarding your data"
                )}
              </li>
            </ul>
          </li>
          <li>
            <strong>{translate("Data Security")}</strong>
            <p>
              {translate(
                "We implement security measures designed to protect your information from unauthorized access and use"
              )}
            </p>
          </li>
          <li>
            <strong>{translate("Cookies and Tracking Technologies")}</strong>
            <p>
              {translate(
                "Our website uses cookies and similar tracking technologies to improve user experience and track website usage"
              )}
            </p>
          </li>
          <li>
            <strong>{translate("Third-Party Links")}</strong>
            <p>
              {translate(
                "Our website may contain links to third-party websites We are not responsible for the privacy practices or the content of those third-party websites"
              )}
            </p>
          </li>
          <li>
            <strong>{translate("Changes to This Privacy Policy")}</strong>
            <p>
              {translate(
                "We may update this Privacy Policy from time to time We will notify you of any changes by posting the new Privacy Policy on this page"
              )}
            </p>
          </li>
          <li>
            <strong>{translate("Contact Us")}</strong>
            <p>
              {translate(
                "If you have any questions about this Privacy Policy please contact us at official email address or reach to us at one of our social media accounts"
              )}
            </p>
          </li>
        </ol>
        <p>
          {translate("For more information please review our")}
          <a href="/legal-disclaimer">{translate("Legal Disclaimer")}</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
