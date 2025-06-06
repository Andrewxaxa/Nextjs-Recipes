"use client";

import { Button } from "@heroui/button";
import { trashIcon } from "../ui/icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { useTransition } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { deleteRecipe } from "@/actions/recipe-actions";
import { Spinner } from "@heroui/spinner";

interface DeleteRecipeProps {
  id: string;
}

const DeleteRecipe: React.FC<DeleteRecipeProps> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteRecipe(id);
        addToast({
          title: "Recipe edited successfully",
          color: "success",
        });
        router.push("/recipes");
      } catch (error) {
        addToast({
          title: "Recipe deletion failed",
          color: "danger",
        });
      }
    });
  };

  if (isPending) {
    return <Spinner color="warning" />;
  }

  return (
    <>
      <button
        className="bg-white rounded-full shadow p-2 hover:bg-red-100 transition"
        title="Delete recipe"
        onClick={onOpen}
      >
        {trashIcon}
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete recipe
              </ModalHeader>
              <ModalBody>
                <p>Do you want to delete this recipe?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onDelete();
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteRecipe;
