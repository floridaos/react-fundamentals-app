import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Button } from "../../common";
import { CourseCard } from "./components";
import { Link } from "react-router-dom";

export const Courses = () => {
  const courses = useSelector((state) => state.courses);

  if (courses.length === 0) {
    return (
      <div className={styles.empty} data-testid="emptyContainer">
        <h2>Your List Is Empty</h2>
        <p>Please use "add new course" button to add your first course</p>
        <div className={styles.buttonContainer}>
          <Link to="/courses/add" className={styles.noUnderline}>
            <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.panel}>
        <Link to="/courses/add" className={styles.noUnderline}>
          <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
        </Link>
      </div>

      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  );
};
