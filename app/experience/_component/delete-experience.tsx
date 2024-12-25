import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";

import { EXPERIENCE } from "@/api-endpoints";
import { useDeleteData } from "@/hooks/mutation.hook";

const DeleteExperience = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = useDeleteData({
    invalidateQueries: [EXPERIENCE],
  });

  const onSubmit = async () => {
    const res = await mutateAsync({
      url: EXPERIENCE + "/" + id,
    });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <>
      <Button size="sm" variant="light" onClick={onOpen}>
        <Trash />
      </Button>
      <Modal
        backdrop="blur"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Delete Experience</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this experience?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              isLoading={isPending}
              size="sm"
              onPress={onSubmit}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteExperience;
