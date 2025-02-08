import Wizard from "@/section/Wizzard/Wizzard";
import { generateWizardMetadata } from "@/utils/generateMetadata";

export const metadata = generateWizardMetadata();

export default function Wizzard() {
  return (
    <>
    <Wizard />
    </>
        
  );
}