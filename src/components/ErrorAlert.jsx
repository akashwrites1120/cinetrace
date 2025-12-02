import React from "react";

const ErrorAlert = ({ error, searchTerm }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-lg mb-8 text-center">
      <strong>Oh snap!</strong> '{searchTerm}' resulted in '{error}' error
    </div>
  );
};

export default ErrorAlert;