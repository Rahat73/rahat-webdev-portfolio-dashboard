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

import { usePostData } from "@/hooks/mutation.hook";
import { PROJECT } from "@/api-endpoints";

const AddProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = usePostData({
    invalidateQueries: [PROJECT],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    const technologies =
      typeof postData.technologies === "string"
        ? postData.technologies.split(",")
        : [];

    const res = await mutateAsync({
      url: PROJECT,
      postData: {
        ...postData,
        technologies,
      },
    });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <>
      <Button size="sm" variant="shadow" onClick={onOpen}>
        Add Project
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
            Add Project
          </ModalHeader>
          <ModalBody>
            <Form validationBehavior="native" onSubmit={onSubmit}>
              <Input
                isRequired
                errorMessage="Please enter a title"
                label="Title"
                labelPlacement="outside"
                name="name"
                placeholder="Enter title"
              />
              <Input
                isRequired
                errorMessage="Please enter a technologies"
                label="Technologies"
                labelPlacement="outside"
                name="technologies"
                placeholder="Enter technologies separated by comma"
              />
              <Input
                isRequired
                errorMessage="Please enter a description"
                label="Description"
                labelPlacement="outside"
                name="description"
                placeholder="Enter description"
              />
              <Input
                isRequired
                errorMessage="Please enter image url"
                label="Image URL"
                labelPlacement="outside"
                name="image"
                placeholder="Enter image url"
                type="url"
              />
              <Input
                isRequired
                errorMessage="Please enter liveLink url"
                label="Live Link"
                labelPlacement="outside"
                name="liveLink"
                placeholder="Enter liveLink url"
                type="url"
              />
              <Input
                isRequired
                errorMessage="Please enter github frontend url"
                label="Github Frontend Link"
                labelPlacement="outside"
                name="githubLinkFront"
                placeholder="Enter github frontend url"
                type="url"
              />
              <Input
                isRequired
                errorMessage="Please enter github backend url"
                label="Github Backend Link"
                labelPlacement="outside"
                name="githubLinkBack"
                placeholder="Enter github backend url"
                type="url"
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

export default AddProject;
