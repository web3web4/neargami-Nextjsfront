import DashboardShell from "@/components/DashboardShell";
import { SimpleForm } from "@/components/Form/SimpleForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default function Form() {
  return (
    <DashboardShell>
      <PageContainer title="Forms">
        <SimpleForm />
      </PageContainer>
    </DashboardShell>

  );
}
