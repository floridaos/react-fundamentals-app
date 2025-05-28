// // Module 1.
// // You don't need this component for Module 1.

// // Module 2.
// // * Uncomment component code with imports
// // * Use this component for author creation functionality
// // * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { Input, Button } from "../../../../common";
import { createAuthorThunk } from "../../../../store/thunks/authorsThunk";

export const CreateAuthor = () => {
  const dispatch = useDispatch();
  const [authorName, setAuthorName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (authorName.trim().length < 2) {
      alert("Author name must be at least 2 characters");
      return;
    }

    const newAuthor = {
      name: authorName.trim(),
    };

    try {
      await dispatch(createAuthorThunk(newAuthor)).unwrap();
      setAuthorName("");
    } catch (error) {
      alert("Failed to create author: " + error.message);
    }
  };

  return (
    <div className={styles.createAuthor}>
      <Input
        labelText="Author Name"
        name="authorName"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholderText="Enter author name"
        data-testid="createAuthorInput"
      />
      <Button
        buttonText="Create Author"
        handleClick={handleCreate}
        data-testid="createAuthorButton"
      />
    </div>
  );
};

// // Module 3.
// // Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

// import React from "react";
// import styles from "./styles.module.css";

// export const CreateAuthor = ({onCreateAuthor}) => {
//   // write your code here
//   return (
//     <div className={styles.newAuthorContainer}>
//       <h2>Author Name</h2>
//       // reuse Input component with data-testid="createAuthorInput" attribute
//       //reuse Button component with data-testid="createAuthorButton" attribute
//     </div>
//   );
// };
