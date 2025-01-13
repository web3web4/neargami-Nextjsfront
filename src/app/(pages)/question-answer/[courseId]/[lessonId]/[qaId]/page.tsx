import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import { QAResponse } from "@/interfaces/api";
import { findQA } from "@/apiService";
import QA from "@/section/QA/QA";
import { generateQAMetadata } from "@/utils/generateMetadata";

export async function generateMetadata({params}: {params: any}) {
  const { courseId, lessonId, qaId } = await params;
  const isEdit= Number(qaId);
  let data: QAResponse | null = null;
  if(isEdit) data = await findQA(courseId, lessonId, qaId);

  return generateQAMetadata(data, courseId, lessonId, qaId);
}

export default async function EditQaPage({params}: {params: any}) {
  const { courseId, lessonId, qaId } = await params;
  const isEdit= Number(qaId);
  let data: QAResponse | null = null;
  if(isEdit) data = await findQA(courseId, lessonId, qaId);

  return (
    <Fragment>
        <Header />
        <PageHeader
          currentPage="Add Course Info"
          pageTitle={`${!isEdit ? "Add" : "Edit"} Q/A`}
        />
        <QA courseId={courseId} lessonId={lessonId} qaId={qaId} data={data} />
    </Fragment>
  );
}
