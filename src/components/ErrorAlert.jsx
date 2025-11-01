import React from "react";

const ErrorAlert = ({error, searchTerm}) => {
  return (
      <div className="alert alert-dismissible alert-danger">
        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        <strong>Oh snap!</strong> '{searchTerm}' resulted in '{error}' error
      </div>
    );
};

export default ErrorAlert;
