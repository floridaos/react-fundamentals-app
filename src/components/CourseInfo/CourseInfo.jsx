// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#course-info
// props description
// * 'coursesList' - list of all courses. You need it to get chosen course from the list
// * 'authorsList' - list of all authors. You need it to get authors' names for chosen course
// * 'showCourseId' - id of chosen course. Use it to find needed course on the 'coursesList'.
import React from "react";
import { useParams, Link } from "react-router-dom";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import styles from "./styles.module.css";
export const CourseInfo = ({ coursesList, authorsList }) => {
  const { courseId } = useParams();
  const course = coursesList.find((course) => course.id === courseId);

  if (!course) return <p data-testid="courseInfo">Course not found</p>;

  const courseAuthors = course.authors.map(
    (id) => authorsList.find((a) => a.id === id)?.name || "Unknown Author"
  );

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{course.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{course.description}</p>
        <div>
          <p>
            <b>ID:</b> {course.id}
          </p>
          <p>
            <b>Duration:</b> {getCourseDuration(course.duration)}
          </p>
          <p>
            <b>Created:</b> {formatCreationDate(course.creationDate)}
          </p>
          <div>
            <b>Authors:</b>
            <ul className={styles.authorsList}>
              {courseAuthors.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Link className={styles.backLink} to="/courses">
        ← BACK
      </Link>
    </div>
  );
};

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

// props description
// * 'coursesList' - list of all courses. You need it to get chosen course from the list
// * 'authorsList' - list of all authors. You need it to get authors' names for chosen course
// * 'showCourseId' - id of chosen course. Use it to find needed course on the 'coursesList'.
