import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Edit } from "lucide-react";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";

import { Experience } from "../page";

import { EXPERIENCE } from "@/api-endpoints";
import { useUpdateData } from "@/hooks/mutation.hook";

const EditExperience = ({ experience }: { experience: Experience }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = useUpdateData({
    invalidateQueries: [EXPERIENCE],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    const res = await mutateAsync({
      url: EXPERIENCE + "/" + experience._id,
      postData,
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
          <ModalHeader className="flex flex-col gap-10">
            Edit Experience
          </ModalHeader>
          <ModalBody>
            <Form validationBehavior="native" onSubmit={onSubmit}>
              <Input
                isRequired
                defaultValue={experience.title}
                errorMessage="Please enter a title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter title"
              />
              <Input
                isRequired
                defaultValue={experience.company}
                errorMessage="Please enter a company name"
                label="Company"
                labelPlacement="outside"
                name="company"
                placeholder="Enter company name"
              />
              <Input
                isRequired
                defaultValue={experience.location}
                errorMessage="Please enter a location"
                label="Location"
                labelPlacement="outside"
                name="location"
                placeholder="Enter company location"
              />
              <DatePicker
                isRequired
                defaultValue={parseDate(experience.startDate.split("T")[0])}
                label="Start Date"
                labelPlacement="outside"
                name="startDate"
              />
              <DatePicker
                defaultValue={
                  experience.endDate
                    ? parseDate(experience.endDate.split("T")[0])
                    : null
                }
                label="End Date"
                labelPlacement="outside"
                name="endDate"
              />
              <Input
                isRequired
                defaultValue={experience.description}
                errorMessage="Please enter a description"
                label="Description"
                labelPlacement="outside"
                name="description"
                placeholder="Enter description"
              />
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

export default EditExperience;
