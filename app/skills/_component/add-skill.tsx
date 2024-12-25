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
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

import { usePostData } from "@/hooks/mutation.hook";
import { SKILL } from "@/api-endpoints";

const SkillOption = [
  {
    label: "Technical",
    key: "technical",
  },
  {
    label: "Soft",
    key: "soft",
  },
];

const AddSkill = () => {
  const [skill, setSkill] = useState("");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = usePostData({
    invalidateQueries: [SKILL],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    const res = await mutateAsync({
      url: SKILL,
      postData: {
        type: skill,
        data: postData,
      },
    });

    if (res?.success) {
      onClose();
      setSkill("");
    }
  };

  return (
    <>
      <Button size="sm" variant="shadow" onClick={onOpen}>
        Add Skill
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
              <Select
                isRequired
                items={SkillOption}
                label="Skill Type"
                name="type"
                placeholder="Select a skill type"
                onChange={(e) => setSkill(e.target.value)}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
              {skill === "technical" && (
                <>
                  <Input
                    isRequired
                    errorMessage="Please enter a icon"
                    label="Icon"
                    labelPlacement="outside"
                    name="icon"
                    placeholder="Enter icon name"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a source"
                    label="Source"
                    labelPlacement="outside"
                    name="source"
                    placeholder="Enter source name"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a label"
                    label="Label"
                    labelPlacement="outside"
                    name="label"
                    placeholder="Enter label"
                  />
                </>
              )}
              {skill === "soft" && (
                <>
                  <Input
                    isRequired
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

export default AddSkill;
