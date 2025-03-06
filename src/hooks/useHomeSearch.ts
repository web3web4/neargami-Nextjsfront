import { searchOnCourses } from "@/apiService";
import { CoursesResponse } from "@/interfaces/api";
import { debounce } from "@/utils/functions";
import { RefObject, useCallback, useState } from "react";

export const useHomeSearch = (
  searchRef: RefObject<HTMLInputElement>,
  initCourses: CoursesResponse[]
) => {
  const [filterCourses, setFilterCourses] = useState<CoursesResponse[]>(initCourses);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (value: string) => {
      try {
        if (!value) {
          setFilterCourses(initCourses);
          return;
        }
        const response = await searchOnCourses(value);
        const coursesData: CoursesResponse[] = response;
        setFilterCourses(coursesData);
      } catch {}
    }, 1000),
    []
  );

  const handleSearch = async () => {
    search(searchRef!.current!.value);
  };

  return { handleSearch, filterCourses };
};
