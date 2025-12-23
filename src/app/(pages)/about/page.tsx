import { HeaderV1, About } from "@/section";
import { PageHeader } from "@/components";
import { generateAboutMetadata } from "@/utils";

export const metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <>
      <HeaderV1 />
      <PageHeader currentPage="About" pageTitle="About" style={{ marginTop: 100 }} />
      <About />
    </>
  );
}