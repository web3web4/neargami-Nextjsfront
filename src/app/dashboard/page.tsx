import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import DashboardShell from "@/components/DashboardShell";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default function Dashboard() {
  return (
	<DashboardShell>
    <PageContainer title="Dashboard">
      <DashboardContent />
    </PageContainer>
	</DashboardShell>

  );
}
