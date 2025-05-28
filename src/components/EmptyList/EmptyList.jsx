import React from "react";
import { Button } from "../../common";

export const EmptyList = () => {
  return (
    <div>
      <h2>Your List Is Empty</h2>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
    </div>
  );
};
