import { Spinner } from "@heroui/spinner";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[40vh] w-full">
      <Spinner size="lg" label="Loading..." />
    </div>
  );
};

export default Loader;
