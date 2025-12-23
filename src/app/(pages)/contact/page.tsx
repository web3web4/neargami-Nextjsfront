import { HeaderV1, Contact } from "@/section";
import { PageHeader } from "@/components";
import { generateContactMetadata } from "@/utils/generateMetadata";

export const metadata = generateContactMetadata();

export default function ContactPage() {
  return (
    <>
      <HeaderV1 />
      <PageHeader currentPage="Contact" pageTitle="Contact" style={{ marginTop: 100 }} />
      <Contact />
    </>
  );
}