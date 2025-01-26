import { updateUserProfile } from "@/apiService";
import { UserProfileData } from "@/interfaces/api";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SingleValue } from "react-select";
import Swal from "sweetalert2";

interface CountryData {
  label: string;
  value: string;
}

export const useWizard = () => {
  const router = useRouter();
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [formInput, setFormInput] = useState<UserProfileData>({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    username: "",
  });

  useEffect(() => {
    setCookie("firstLogin", false);
  }, []);

  const handleCountryChange = (selectedCountry: SingleValue<CountryData>) => {
    if (selectedCountry) {
      setFormInput((prevInput) => ({
        ...prevInput,
        country: selectedCountry.label,
      }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(e.target.checked);
  };

  const handleNext = () => {
    if (step === 1 && !isAccepted) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please accept the terms and conditions before proceeding.",
      });
      return;
    }
    if (!isUsernameAvailable) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username Is Already Exist",
      });
      return;
    }
    if (step < 2) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  /**
   * This function updates the user's profile.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const responce = await updateUserProfile(formInput); // Ensure updateUserProfile is typed correctly elsewhere
      console.log("User updated successfully", responce);
    } catch (error) {
      console.error("Error updating user profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error created.",
      });
    }
  };

  const handleComplateToProfile = async (e: FormEvent) => {
    await handleSubmit(e);
    router.push("/profile"); // Using direct navigation instead of Link
  };

  const handleBackToHome = async (e: FormEvent) => {
    await handleSubmit(e);
    router.push("/"); // Using direct navigation instead of Link
  };

  const descriptionpopup = `By using our service you automatically agree to our Privacy Policy and our Legal Disclaimer. Otherwise, please do not use our service.
Legal Disclaimer
General Information:
The information provided here is for informational purposes only and does not constitute legal, financial, or investment advice. By accessing this website or participating in our platform, you agree to these terms.

Token Nature and Value:
The tokens issued by our platform are intended solely for use within our gamified e-learning environment. These tokens have no value at all; they have 0 value and no purpose even if it is mentioned explicitly or implicitly anywhere else in the game, the website, or any other mediums. They have no intrinsic or extrinsic value and are not financial instruments. They should not be considered as an investment, currency, or anything that has a value.

Token Dynamics:
Minting and Burning: Our platform reserves the right to mint or burn tokens at any time, for any user or for all users, with or without their acknowledgment. Our platform can do this whether it is essential for maintaining the functionality and balance of our system or not. Users acknowledge and accept this condition as part of their participation.

Platform and Service Flexibility:
We reserve the right to rebrand, rename, or cease operations of the website and its related services without notice. The platform may at any time discontinue the use of current tokens, adopt new tokens, or alter the functionality and utility of these tokens without user consent. The platform can change anything and everything at any time, stop working at any time, stop using or issuing the tokens at any time, and destroy (burn) some or all the tokens for some or all the users at any time.

Platform Dependency:
The tokens are exclusively usable within the operational context of our platform. If the website or platform ceases operation, these tokens become unusable and possess no utility or value outside of the service.

Risks Involved:
Participation in our platform involves risks, including but not limited to technical failures, regulatory changes, or alterations to the service framework. Users are encouraged to perform independent due diligence and consult financial advisors as needed.

Limitation of Liability:
Our platform disclaims any liability for direct or consequential losses resulting from the use of tokens or any alteration, interruption, or discontinuation of the platform’s operation. Users engage with the platform and its tokens entirely at their own risk.

Regulatory Compliance:
We operate in compliance with local regulations and strictly adhere to AML (Anti-Money Laundering) and KYC (Know Your Customer) protocols. Users may be required to provide identification to ensure regulatory compliance.

Data Protection:
Personal data is managed in accordance with applicable data protection laws, including GDPR. Please refer to our Privacy Policy for detailed information.

Geographical Restrictions:
By using our platform, you confirm that you are not a citizen or resident of the United States, any European Union member state, or any other jurisdiction where our services might be restricted or subject to specific regulatory oversight. Notably, this includes countries commonly subject to U.S. sanctions such as North Korea, Iran, Syria, Cuba, and Venezuela, among others. This is not an exhaustive list, and it is your responsibility to ascertain that accessing and using our platform complies with all applicable legal or regulatory restrictions in your country of residence. Users from restricted jurisdictions should not attempt to register on or use our services. If you are a resident or citizen of these regions, or any other region where such services are unlawful, you are hereby notified not to use any of our services.

Changes to Terms:
We reserve the right to update or change this disclaimer and our terms of service at any time. Continued site use implies acceptance of these changes.

Contact Information:
For any inquiries or concerns regarding these disclaimers, contact us at [contact email/phone number].

By participating in our platform, users acknowledge these conditions and the functional limitations of the tokens.`;
  return {
    step,
    formInput,
    isAccepted,
    descriptionpopup,
    handleNext,
    handlePrev,
    handleBackToHome,
    handleInputChange,
    handleCountryChange,
    handleCheckboxChange,
    handleComplateToProfile,
    setIsUsernameAvailable,
  };
};
