import Header from "@/section/Header/v1/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import LegalDisclaimer from "@/section/LegalDisclaimer/LegalDisclaimer";
import { generateLegalDisclaimerMetadata } from "@/utils/generateMetadata";

export const metadata = generateLegalDisclaimerMetadata();

export default function LegalDisclaimerPage() {
  return (
      <>
        <Header />
        <PageHeader currentPage="Legal Disclaimer" pageTitle="Legal Disclaimer" style={{ marginTop: 100 }}/>
        <LegalDisclaimer />
      </>
  );
}
