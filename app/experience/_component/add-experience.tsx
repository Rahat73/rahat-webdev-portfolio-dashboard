import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { usePostData } from "@/hooks/mutation.hook";
import { EXPERIENCE } from "@/api-endpoints";

const AddExperience = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = usePostData({
    invalidateQueries: [EXPERIENCE],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    const res = await mutateAsync({
      url: EXPERIENCE,
      postData,
    });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <>
      <Button size="sm" variant="shadow" onClick={onOpen}>
        Add Experience
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
            Add Experience
          </ModalHeader>
          <ModalBody>
            <Form validationBehavior="native" onSubmit={onSubmit}>
              <Input
                isRequired
                errorMessage="Please enter a title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter title"
              />
              <Input
                isRequired
                errorMessage="Please enter a company name"
                label="Company"
                labelPlacement="outside"
                name="company"
                placeholder="Enter company name"
              />
              <Input
                isRequired
                errorMessage="Please enter a location"
                label="Location"
                labelPlacement="outside"
                name="location"
                placeholder="Enter company location"
              />
              <DatePicker
                isRequired
                label="Start Date"
                labelPlacement="outside"
                name="startDate"
              />
              <DatePicker
                label="End Date"
                labelPlacement="outside"
                name="endDate"
              />
              <Input
                isRequired
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

export default AddExperience;
