"use client";

import React from "react";

import ErrorComponent from "@/components/ui/error-component";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return <ErrorComponent error={error} />;
};

export default Error;
