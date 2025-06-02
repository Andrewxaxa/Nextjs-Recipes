"use client";

import { Button } from "@heroui/button";
import { useFormStatus } from "react-dom";

const Submit: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-2"
      type="submit"
      color="primary"
      disabled={pending}
      isLoading={pending}
    >
      Submit
    </Button>
  );
};

export default Submit;
