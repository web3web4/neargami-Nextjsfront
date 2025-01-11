import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import { fetchCoursesForTeacherDashboard } from "@/apiService";
import TeacherList from "@/section/TeacherDashboard/TeacherList";


export default async function TeacherDashboardPage() {
  const data = await fetchCoursesForTeacherDashboard();

  return (
    <Fragment>
      <Header />
      <PageHeader
        currentPage="Teacher Dashboard"
        pageTitle="Teacher Dashboard"
      />
      <TeacherList courses={data} />
    </Fragment>
  );
}
