import { useTranslations } from "next-intl";
import styles from "./About.module.css";

const About = () => {
  const translate = useTranslations("About");
  return (
    <div className={styles.container}>
      <div style={{ marginTop: 50 }}>
        <h1>{translate("About NearGami")}</h1>
        
        <section>
          <h2>{translate("Our Mission")}</h2>
          <p>
            {translate(
              "NearGami is a revolutionary gamified e-learning platform that transforms the way people learn about Web3  blockchain technology  and the NEAR Protocol Our mission is to make complex blockchain concepts accessible  engaging  and rewarding for learners of all levels"
            )}
          </p>
        </section>

        <section>
          <h2>{translate("What We Do")}</h2>
          <p>
            {translate(
              "We combine the power of gamification with comprehensive educational content to create an immersive learning experience Through our platform users can"
            )}
          </p>
          <ul>
            <li>{translate("Learn Web3 and blockchain fundamentals through interactive courses")}</li>
            <li>{translate("Earn tokens and rewards as they progress through lessons")}</li>
            <li>{translate("Compete with other learners on our global leaderboard")}</li>
            <li>{translate("Access hands-on tutorials and practical exercises")}</li>
            <li>{translate("Build real-world skills in smart contract development")}</li>
          </ul>
        </section>

        <section>
          <h2>{translate("Our Platform Features")}</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h3>{translate("Gamified Learning")}</h3>
              <p>
                {translate(
                  "Experience learning like never before with our point-based system achievements and competitive elements that make education fun and engaging"
                )}
              </p>
            </div>
            <div className={styles.feature}>
              <h3>{translate("NEAR Protocol Integration")}</h3>
              <p>
                {translate(
                  "Learn directly on the NEAR blockchain with real smart contracts wallets and decentralized applications in a safe learning environment"
                )}
              </p>
            </div>
            <div className={styles.feature}>
              <h3>{translate("Interactive Courses")}</h3>
              <p>
                {translate(
                  "Our courses feature multimedia content quizzes coding challenges and practical projects that reinforce learning through hands-on experience"
                )}
              </p>
            </div>
            <div className={styles.feature}>
              <h3>{translate("Community Driven")}</h3>
              <p>
                {translate(
                  "Join a vibrant community of learners developers  and blockchain enthusiasts who share knowledge and support each others growth"
                )}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>{translate("Why Choose NearGami")}</h2>
          <p>
            {translate(
              "Traditional learning methods often fail to engage students in complex technical subjects NearGami addresses this challenge by"
            )}
          </p>
          <ul>
            <li>🎮 {translate("Making learning interactive and rewarding through gamification")}</li>
            <li>🔧 {translate("Providing practical hands-on experience with real blockchain technology")}</li>
            <li>👨‍🏫 {translate("Offering courses designed by industry experts and experienced developers")}</li>
            <li>🤝 {translate("Creating a supportive community environment for collaborative learning")}</li>
            <li>🔄 {translate("Ensuring content is always up-to-date with the latest blockchain developments")}</li>
          </ul>
        </section>

        <section>
          <h2>{translate("Our Vision")}</h2>
          <p>
            {translate(
              "We envision a future where blockchain education is accessible to everyone regardless of their technical background Through NearGami we aim to bridge the knowledge gap in Web3 technologies and empower the next generation of blockchain developers entrepreneurs and innovators"
            )}
          </p>
        </section>

        <section>
          <h2>{translate("Technology Stack")}</h2>
          <p>
            {translate(
              "NearGami is built using cutting-edge technologies to ensure a seamless and secure learning experience"
            )}
          </p>
          <ul>
            <li>⛓️ {translate("NEAR Protocol and Solidity for blockchain integration and smart contracts")}</li>
            <li>⚛️ {translate("Nextjs for a modern responsive user interface")}</li>
            <li>📝 {translate("TypeScript for type-safe maintainable code")}</li>
          </ul>
        </section>

        <section>
          <h2>{translate("Get Started Today")}</h2>
          <p>
            {translate(
              "Ready to begin your Web3 learning journey? Join thousands of learners who are already discovering the exciting world of blockchain technology through NearGami Whether you re a complete beginner or looking to advance your existing skills  we have courses tailored to your needs"
            )}
          </p>
          <p>
            {translate(
              "Start learning today and become part of the decentralized future Play to learn learn to earn"
            )}
          </p>
        </section>

        <div className={styles.callToAction}>
          <p>
            {translate("Questions about our platform? Visit our")} <a href="/contact">{translate("Contact page")}</a> {translate("to get in touch with our team")}
          </p>
          <p>
            {translate("For legal information please review our")} <a href="/privacy-policy">{translate("Privacy Policy")}</a> {translate("and")} <a href="/legal-disclaimer">{translate("Legal Disclaimer")}</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;