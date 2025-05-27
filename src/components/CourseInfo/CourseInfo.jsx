import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import styles from "./styles.module.css";

export const CourseInfo = () => {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);

  const course = courses.find((course) => course.id === courseId);
  if (!course) return <p data-testid="courseInfo">Course not found</p>;

  const courseAuthors = course.authors.map(
    (id) => authors.find((a) => a.id === id)?.name || "Unknown Author"
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
