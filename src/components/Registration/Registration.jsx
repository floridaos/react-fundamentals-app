// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)
//
// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-219&t=OXbHXwMixWTtxRSw-1
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-257&t=OXbHXwMixWTtxRSw-1
// // * render this component by route '/registration'
// // * submit form data and make POST API request '/registration'.
// // * after successful registration navigates to '/login' route.
// // * component should have a link to the Login page (see design)
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#registration-new-component
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { createUser } from "../../services";

export const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await createUser(formData);
      navigate("/login");
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} data-testid="registrationForm">
          <Input
            labelText="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholderText="Enter your name"
            data-testid="nameInput"
          />
          {errors.name && (
            <div className={styles.error} data-testid="nameError">
              {errors.name}
            </div>
          )}

          <Input
            labelText="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholderText="Enter your email"
            data-testid="emailInput"
          />
          {errors.email && (
            <div className={styles.error} data-testid="emailError">
              {errors.email}
            </div>
          )}

          <Input
            labelText="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholderText="Enter password"
            data-testid="passwordInput"
          />
          {errors.password && (
            <div className={styles.error} data-testid="passwordError">
              {errors.password}
            </div>
          )}

          <Button
            buttonText="Register"
            type="submit"
            data-testid="registrationButton"
          />
        </form>

        <p>
          If you have an account you may{" "}
          <Link to="/login" data-testid="loginLink">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
