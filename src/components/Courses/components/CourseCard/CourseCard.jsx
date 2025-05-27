import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../../../common";
import styles from "./styles.module.css";
import { getCourseDuration, formatCreationDate } from "../../../../helpers";
import { deleteCourse } from "../../../../store/slices/coursesSlice";
import { deleteCourseApi } from "../../../../services";

export const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);

  const courseAuthors = course.authors
    .map((id) => authors.find((a) => a.id === id)?.name || "Unknown Author")
    .join(", ");

  const handleDelete = async () => {
    try {
      await deleteCourseApi(course.id);
      dispatch(deleteCourse(course.id));
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении курса" || "Something went wrong");
    }
  };

  return (
    <div className={styles.cardContainer} data-testid="courseCard">
      <div className={styles.cardText}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.cardDetails}>
        <p>
          <b>Authors: </b>
          <span title={courseAuthors} className={styles.truncate}>
            {courseAuthors}
          </span>
        </p>
        <p>
          <b>Duration:</b> <span>{getCourseDuration(course.duration)}</span>
        </p>
        <p>
          <b>Created: </b>
          <span>{formatCreationDate(course.creationDate)}</span>
        </p>
        <div className={styles.buttonsContainer}>
          <Link to={`/courses/${course.id}`} className={styles.noUnderline}>
            <Button buttonText="SHOW COURSE" />
          </Link>
          <>
            <Button buttonText="UPDATE" />
            <Button
              buttonText="DELETE"
              handleClick={handleDelete}
              data-testid="deleteCourse"
            />
          </>
        </div>
      </div>
    </div>
  );
};
