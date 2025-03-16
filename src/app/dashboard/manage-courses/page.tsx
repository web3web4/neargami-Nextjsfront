import { getAllCourses } from "@/apiServiceDashboard";
import DashboardShell from "@/components/DashboardShell";
import ManageCourses  from "@/section/Manage-Courses-Dashboard/ManageCourses";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default async function Customers() {
	const data = await getAllCourses();
	return (
		<DashboardShell>
			<PageContainer title="Manage Courses">
				<ManageCourses data={data} />
			</PageContainer>
		</DashboardShell>

	);
}
