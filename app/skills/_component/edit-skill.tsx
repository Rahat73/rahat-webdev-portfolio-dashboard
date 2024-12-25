import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Edit } from "lucide-react";

import { useUpdateData } from "@/hooks/mutation.hook";
import { SKILL } from "@/api-endpoints";

const EditSkill = ({ skillData, type }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = useUpdateData({
    invalidateQueries: [SKILL],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    const res = await mutateAsync({
      url: SKILL + "/" + skillData._id,
      postData: {
        type: type,
        data: postData,
      },
    });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <>
      <Button size="sm" variant="light" onClick={onOpen}>
        <Edit />
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
          <ModalHeader className="flex flex-col gap-10">Add Skill</ModalHeader>
          <ModalBody>
            <Form validationBehavior="native" onSubmit={onSubmit}>
              {type === "technical" && (
                <>
                  <Input
                    isRequired
                    defaultValue={skillData.icon}
                    errorMessage="Please enter a icon"
                    label="Icon"
                    labelPlacement="outside"
                    name="icon"
                    placeholder="Enter icon name"
                  />
                  <Input
                    isRequired
                    defaultValue={skillData.source}
                    errorMessage="Please enter a source"
                    label="Source"
                    labelPlacement="outside"
                    name="source"
                    placeholder="Enter source name"
                  />
                  <Input
                    isRequired
                    defaultValue={skillData.label}
                    errorMessage="Please enter a label"
                    label="Label"
                    labelPlacement="outside"
                    name="label"
                    placeholder="Enter label"
                  />
                </>
              )}
              {type === "soft" && (
                <>
                  <Input
                    isRequired
                    defaultValue={skillData.content}
                    errorMessage="Please enter a content"
                    label="Content"
                    labelPlacement="outside"
                    name="content"
                    placeholder="Enter content"
                  />
                </>
              )}
              <Button isLoading={isPending} type="submit" variant="bordered">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSkill;
