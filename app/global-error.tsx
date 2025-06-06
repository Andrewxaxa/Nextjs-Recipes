"use client";

import "@/styles/globals.css";

import React from "react";

const GlobalError = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-6 text-lg text-red-600">
        An unexpected error occured. Please refresh the page.
      </p>
      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleReload}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default GlobalError;
