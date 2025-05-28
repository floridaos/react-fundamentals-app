import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common";
import { getCourseDuration } from "../../helpers";
import styles from "./styles.module.css";
import deleteIcon from "../../assets/deleteButtonIcon.svg";
import editIcon from "../../assets/editButtonIcon.svg";

export const CourseCard = ({ course, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.mainInfo}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.info}>
          <p>
            <strong>Authors:</strong> {course.authors.join(", ")}
          </p>
          <p>
            <strong>Duration:</strong> {getCourseDuration(course.duration)}
          </p>
          <p>
            <strong>Created:</strong> {course.creationDate}
          </p>
        </div>
        <div className={styles.buttons}>
          <Button
            buttonText={
              <img src={editIcon} alt="Edit" width="20" height="20" />
            }
            handleClick={() =>
              (window.location.href =
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            }
            data-testid="editButton"
            className={styles.iconButton}
          />
          <Button
            buttonText={
              <img src={deleteIcon} alt="Delete" width="20" height="20" />
            }
            handleClick={() => onDelete(course.id)}
            data-testid="deleteButton"
            className={styles.iconButton}
          />
          <Button
            buttonText="Show course"
            handleClick={() => navigate(`/courses/${course.id}`)}
            data-testid="showButton"
          />
        </div>
      </div>
    </div>
  );
};
