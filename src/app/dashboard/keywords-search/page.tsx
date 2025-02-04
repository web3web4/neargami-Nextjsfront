import DashboardShell from "@/components/DashboardShell";
import Keywords  from "@/section/Keywords-Search/keywords";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import {keyWordsSearch} from "@/apiServiceDashboard";


export default async function KeyWords() {
    const data = await keyWordsSearch();
    return (
        <DashboardShell>
            <PageContainer title="Customers">
                <Keywords data={data} />
            </PageContainer>
        </DashboardShell>

    );
}
