import Header from "@/section/Header/v1/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import About from "@/section/About/About";
import { generateAboutMetadata } from "@/utils/generateMetadata";

export const metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
      <>
        <Header />
        <PageHeader currentPage="About" pageTitle="About" style={{ marginTop: 100 }} />
        <About />
      </>
  );
}