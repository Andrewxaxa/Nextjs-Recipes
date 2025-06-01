"use client";

import ErrorComponent from "@/components/ui/error-component";
import React from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return <ErrorComponent error={error} />;
};

export default Error;
