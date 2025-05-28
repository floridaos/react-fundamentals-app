import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { getCourses, getAuthors } from "./services";
import { setCourses } from "./store/slices/coursesSlice";
import { setAuthors } from "./store/slices/authorsSlice";
import { setUserData, removeUserData } from "./store/slices/userSlice";
import {
  Header,
  Courses,
  CourseInfo,
  Registration,
  Login,
  CourseForm,
} from "./components";
import styles from "./App.module.css";

// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components
// * use hook useState for saving selected courseId [showCourseId, handleShowCourse]

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, name: userName, isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    // Восстанавливаем состояние авторизации при загрузке
    const savedToken = localStorage.getItem("token");
    const savedUserName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedToken && savedUserName) {
      dispatch(
        setUserData({
          token: savedToken,
          name: savedUserName,
          email: savedEmail || "",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, authorsData] = await Promise.all([
          getCourses(),
          getAuthors(),
        ]);
        dispatch(setCourses(coursesData));
        dispatch(setAuthors(authorsData));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (token) {
      fetchData();
    }

    if (location.pathname === "/" || location.pathname === "") {
      navigate(token ? "/courses" : "/login", { replace: true });
    }
  }, [dispatch, location.pathname, navigate, token]);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";

  return (
    <div className={styles.wrapper}>
      {!isAuthPage && isAuth && (
        <Header userName={userName} onLogout={handleLogout} />
      )}
      <div className={styles.container}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses"
            element={isAuth ? <Courses /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses/:courseId"
            element={isAuth ? <CourseInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses/add"
            element={isAuth ? <CourseForm /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={isAuth ? "/courses" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
