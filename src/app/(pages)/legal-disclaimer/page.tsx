import { Fragment } from "react";
import Header from "@/section/Header/v1/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import LegalDisclaimer from "@/section/LegalDisclaimer/LegalDisclaimer";

export default function LegalDisclaimerPage() {
  return (
    <Fragment>
        <Header />
        <PageHeader currentPage="Legal Disclaimer" pageTitle="Legal Disclaimer" style={{ marginTop: 100 }}/>
        <LegalDisclaimer />
    </Fragment>
  );
}
