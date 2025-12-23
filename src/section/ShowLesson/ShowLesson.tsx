import { ListManager, Button } from "@/components";
import { LessonResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";
import styles from "./ShowLesson.module.css";

export default function ShowLesson({
  courseId,
  courseSlug,
  data,
}: {
  courseId: string;
  courseSlug: string;
  data: LessonResponse;
}) {
  const translate = useTranslations("ShowLesson");
  return (
    <div className={styles.showLessonStyleWrapper}>
      <div className="container">
        <h4>
          {data && data?.lectures?.length > 0
            ? `${translate("Lessons")} ${data?.lectures[0]?.course?.name}`
            : translate("All Lessons")}{" "}
        </h4>
        <div className="d-flex justify-content-between">
          <Button size="md" variant="mint" href={`/lesson/${courseId}/add`}>
            {translate("Add a Lesson")}
          </Button>
          <Button size="md" variant="mint" href={`/course-info/${courseSlug}`}>
            {translate("Back to Edit Course")}
          </Button>
        </div>
        <div className="row">
          {data && data?.lectures?.length > 0 && (
            <ListManager
              initialData={data?.lectures}
              mainField={"title"}
              href={`/lesson/${courseId}`}
              idField={"id"}
              arrangeFild={"order"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
