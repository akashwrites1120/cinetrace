import React from "react";

const ErrorAlert = () => {
  return (
      <div class="alert alert-dismissible alert-danger">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Oh snap!</strong> '{searchTerm}' resulted in '{error}' error
      </div>
    );
};

export default ErrorAlert;
