import styles from "./LegalDisclaimer.module.css";


const LegalDisclaimer = () => {
    return (
      <div className={styles.container}>
          <div style={{marginTop: 50}}>
          By using our service you automatically agree to our <a href="/privacy-policy">Privacy Policy</a> and our Legal Disclaimer. Otherwise, please do not use our service.
  
          <h1>Legal Disclaimer</h1>
          <ol>
              <li>
                  <strong>General Information:</strong>
                  <p>The information provided here is for informational purposes only and does not constitute legal, financial, or investment advice. By accessing this website or participating in our platform, you agree to these terms.</p>
              </li>
              <li>
                  <strong>Token Nature and Value:</strong>
                  <p>The tokens issued by our platform are intended solely for use within our gamified e-learning environment. <strong>These tokens have no value at all; they have 0 value and no purpose even if it is mentioned explicitly or implicitly anywhere else in the game, the website, or any other mediums.</strong> They have no intrinsic or extrinsic value and are not financial instruments. They should not be considered as an investment, currency, or anything that has a value.</p>
              </li>
              <li>
                  <strong>Token Dynamics:</strong>
                  <p><strong>Minting and Burning:</strong> Our platform reserves the right to mint or burn tokens at any time, for any user or for all users, with or without their acknowledgment. Our platform can do this whether it is essential for maintaining the functionality and balance of our system or not. Users acknowledge and accept this condition as part of their participation.</p>
              </li>
              <li>
                  <strong>Platform and Service Flexibility:</strong>
                  <p>We reserve the right to rebrand, rename, or cease operations of the website and its related services without notice. The platform may at any time discontinue the use of current tokens, adopt new tokens, or alter the functionality and utility of these tokens without user consent. The platform can change anything and everything at any time, stop working at any time, stop using or issuing the tokens at any time, and destroy (burn) some or all the tokens for some or all the users at any time.</p>
              </li>
              <li>
                  <strong>Platform Dependency:</strong>
                  <p>The tokens are exclusively usable within the operational context of our platform. If the website or platform ceases operation, these tokens become unusable and possess no utility or value outside of the service.</p>
              </li>
              <li>
                  <strong>Risks Involved:</strong>
                  <p>Participation in our platform involves risks, including but not limited to technical failures, regulatory changes, or alterations to the service framework. Users are encouraged to perform independent due diligence and consult financial advisors as needed.</p>
              </li>
              <li>
                  <strong>Limitation of Liability:</strong>
                  <p>Our platform disclaims any liability for direct or consequential losses resulting from the use of tokens or any alteration, interruption, or discontinuation of the platform’s operation. Users engage with the platform and its tokens entirely at their own risk.</p>
              </li>
              <li>
                  <strong>Regulatory Compliance:</strong>
                  <p>We operate in compliance with local regulations and strictly adhere to AML (Anti-Money Laundering) and KYC (Know Your Customer) protocols. Users may be required to provide identification to ensure regulatory compliance.</p>
              </li>
              <li>
                  <strong>Data Protection:</strong>
                  <p>Personal data is managed in accordance with applicable data protection laws, including GDPR. Please refer to our Privacy Policy for detailed information.</p>
              </li>
              <li>
                  <strong>Geographical Restrictions:</strong>
                  <p>By using our platform, you confirm that you are not a citizen or resident of the United States, any European Union member state, or any other jurisdiction where our services might be restricted or subject to specific regulatory oversight. Notably, this includes countries commonly subject to U.S. sanctions such as North Korea, Iran, Syria, Cuba, and Venezuela, among others. This is not an exhaustive list, and it is your responsibility to ascertain that accessing and using our platform complies with all applicable legal or regulatory restrictions in your country of residence. Users from restricted jurisdictions should not attempt to register on or use our services. If you are a resident or citizen of these regions, or any other region where such services are unlawful, you are hereby notified not to use any of our services.</p>
              </li>
              <li>
                  <strong>Changes to Terms:</strong>
                  <p>We reserve the right to update or change this disclaimer and our terms of service at any time. Continued site use implies acceptance of these changes.</p>
              </li>
              <li>
                  <strong>Contact Information:</strong>
                  <p>For any inquiries or concerns regarding these disclaimers, contact us at [contact email/phone number].</p>
              </li>
          </ol>
          <p>By participating in our platform, users acknowledge these conditions and the functional limitations of the tokens.</p>
        </div>
      </div>
    );
  };
  
  export default LegalDisclaimer;
  