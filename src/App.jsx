import styles from "./App.module.css";
import {
  Header,
  Courses,
  CourseInfo,
  Registration,
  Login,
  CourseForm,
} from "./components";
import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, getAuthors } from "./services";
import { setCourses } from "./store/slices/coursesSlice";
import { setAuthors } from "./store/slices/authorsSlice";
import { logoutUser } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.user.token);
  const userName = useSelector((state) => state.user.name);

  useEffect(() => {
    if (token) {
      getCourses().then((courses) => dispatch(setCourses(courses)));
      getAuthors().then((authors) => dispatch(setAuthors(authors)));
    }

    if (location.pathname === "/" || location.pathname === "") {
      navigate(token ? "/courses" : "/login", { replace: true });
    }
  }, [dispatch, token, navigate, location.pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";

  return (
    <div className={styles.wrapper}>
      {!isAuthPage && token && (
        <Header userName={userName} onLogout={handleLogout} />
      )}
      <div className={styles.container}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses"
            element={token ? <Courses /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses/:courseId"
            element={token ? <CourseInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses/add"
            element={token ? <CourseForm /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/courses" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
