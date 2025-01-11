import styles from "./ShowLesson.module.css";
import ListManager from "@/components/listManager/ListManager";
import Button from "@/components/button/Button";
import { LessonResponse } from "@/interfaces/api";

export default function ShowLesson({
  courseId,
  data,
}: {
  courseId: string;
  data: LessonResponse;
}) {
  return (
    <div className={styles.showLessonStyleWrapper}>
      <div className="container">
        <h4>
          {data && data?.lectures?.length > 0
            ? data?.lectures[0]?.course?.name
            : "All"}{" "}
          Lessons
        </h4>
        <div className="d-flex justify-content-between">
          <Button size="md" variant="mint" href={`/lesson/${courseId}/add`}>
            Add a Lesson
          </Button>
          <Button size="md" variant="mint" href={`/course-info/${courseId}`}>
            Back to Edit Course
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
