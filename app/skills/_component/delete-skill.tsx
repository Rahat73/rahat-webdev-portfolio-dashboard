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

import { useDeleteData } from "@/hooks/mutation.hook";
import { SKILL } from "@/api-endpoints";

const DeleteSkill = ({ id, type }: { id: string; type: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = useDeleteData({
    invalidateQueries: [SKILL],
  });

  const onSubmit = async () => {
    const res = await mutateAsync({
      url: SKILL + "/" + id,
      postData: {
        type,
      },
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
          <ModalHeader>Delete Skill</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this skill?</p>
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

export default DeleteSkill;
