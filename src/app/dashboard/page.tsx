import { DashboardContent, DashboardShell, PageContainer } from "@/components";

export default function Dashboard() {
  return (
    <DashboardShell>
      <PageContainer title="Dashboard">
        <DashboardContent />
      </PageContainer>
    </DashboardShell>

  );
}
