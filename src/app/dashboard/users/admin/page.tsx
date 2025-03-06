import { getUserAdmin } from "@/apiServiceDashboard";
import DashboardShell from "@/components/DashboardShell";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import  AdminList   from "@/section/users/Admin/AdminList";

export default async function Admin() {
	const data = await getUserAdmin();
	return (
		<DashboardShell>
			<PageContainer title="Admin">
				<AdminList data={data}/>
			</PageContainer>
		</DashboardShell>

	);
}
