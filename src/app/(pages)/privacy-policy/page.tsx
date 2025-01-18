import { Fragment } from "react";
import Header from "@/section/Header/v1/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import PrivacyPolicy from "@/section/PrivacyPolicy/Privacy-Policy";
import { generatePrivacyPolicyMetadata } from "@/utils/generateMetadata";

export const metadata = generatePrivacyPolicyMetadata();


export default function PrivacyPolicyPage() {
  return (
    <Fragment>
        <Header />
        <PageHeader currentPage="User Privacy Policy" pageTitle="Privacy Policy" style={{ marginTop: 100 }} />
        <PrivacyPolicy />
    </Fragment>
  );
}