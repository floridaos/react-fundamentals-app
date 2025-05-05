import React, { useState } from "react";

import styles from "./App.module.css";
import { mockedAuthorsList, mockedCoursesList } from "./constants";
import { CourseInfo, Courses, Header } from "./components";

function App() {
  const [showCourseId, setShowCourseId] = useState("");
  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <div className={styles.container}>
        {showCourseId === "" ? (
          <Courses
            coursesList={mockedCoursesList}
            authorsList={mockedAuthorsList}
            handleShowCourse={setShowCourseId}
          />
        ) : (
          <CourseInfo
            coursesList={mockedCoursesList}
            authorsList={mockedAuthorsList}
            showCourseId={showCourseId}
            onBack={() => setShowCourseId("")}
          />
        )}
      </div>
    </div>
  );
}

export default App;
