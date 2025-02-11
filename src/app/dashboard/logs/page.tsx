import { logServer } from "@/apiServiceDashboard";
import DashboardShell from "@/components/DashboardShell";
import LogServer  from "@/section/Logs-Server/Logs";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default async function Customers() {
    const data = await logServer();
    return (
        <DashboardShell>
            <PageContainer title="Logs Server">
                <LogServer data={data} />
            </PageContainer>
        </DashboardShell>

    );
}
