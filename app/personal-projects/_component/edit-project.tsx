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

import { Project } from "../page";

import { PROJECT } from "@/api-endpoints";
import { useUpdateData } from "@/hooks/mutation.hook";

const EditProject = ({ project }: { project: Project }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = useUpdateData({
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
      url: PROJECT + "/" + project._id,
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
                defaultValue={project.name}
                errorMessage="Please enter a title"
                label="Title"
                labelPlacement="outside"
                name="name"
                placeholder="Enter title"
              />
              <Input
                isRequired
                defaultValue={project.technologies.join(", ")}
                errorMessage="Please enter a technologies"
                label="Technologies"
                labelPlacement="outside"
                name="technologies"
                placeholder="Enter technologies separated by comma"
              />
              <Input
                isRequired
                defaultValue={project.description}
                errorMessage="Please enter a description"
                label="Description"
                labelPlacement="outside"
                name="description"
                placeholder="Enter description"
              />
              <Input
                isRequired
                defaultValue={project.image}
                errorMessage="Please enter image url"
                label="Image URL"
                labelPlacement="outside"
                name="image"
                placeholder="Enter image url"
                type="url"
              />
              <Input
                isRequired
                defaultValue={project.liveLink}
                errorMessage="Please enter liveLink url"
                label="Live Link"
                labelPlacement="outside"
                name="liveLink"
                placeholder="Enter liveLink url"
                type="url"
              />
              <Input
                isRequired
                defaultValue={project.githubLinkFront}
                errorMessage="Please enter github frontend url"
                label="Github Frontend Link"
                labelPlacement="outside"
                name="githubLinkFront"
                placeholder="Enter github frontend url"
                type="url"
              />
              <Input
                isRequired
                defaultValue={project.githubLinkBack}
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

export default EditProject;
