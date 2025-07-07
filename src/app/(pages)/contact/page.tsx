import Header from "@/section/Header/v1/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import Contact from "@/section/Contact/Contact";
import { generateContactMetadata } from "@/utils/generateMetadata";

export const metadata = generateContactMetadata();

export default function ContactPage() {
  return (
      <>
        <Header />
        <PageHeader currentPage="Contact" pageTitle="Contact" style={{ marginTop: 100 }} />
        <Contact />
      </>
  );
}