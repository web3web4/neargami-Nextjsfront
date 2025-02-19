import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import { getAllCoursesForTeacher } from "@/apiService";
import TeacherList from "@/section/TeacherDashboard/TeacherList";
import { generateTeacherDashboardMetadata } from "@/utils/generateMetadata";

export const metadata = generateTeacherDashboardMetadata();

export default async function TeacherDashboardPage() {
  const data = await getAllCoursesForTeacher();

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
