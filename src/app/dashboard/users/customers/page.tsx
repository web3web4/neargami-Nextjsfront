import { getAllCustomers } from "@/apiServiceDashboard";
import DashboardShell from "@/components/DashboardShell";
import CustomerList  from "@/section/users/Customers/CustomerList";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default async function Customers() {
	const data = await getAllCustomers();
	return (
		<DashboardShell>
			<PageContainer title="Customers">
				<CustomerList data={data} />
			</PageContainer>
		</DashboardShell>

	);
}
