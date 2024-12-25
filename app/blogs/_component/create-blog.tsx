"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React from "react";
import { Form } from "@nextui-org/form";
import { Input, Textarea } from "@nextui-org/input";

import { usePostData } from "@/hooks/mutation.hook";
import { BLOG } from "@/api-endpoints";

import "react-quill/dist/quill.snow.css";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ header: [2, 3, false] }],
  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

const CreateBlog = () => {
  //   const [content, setContent] = useState("");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = usePostData({
    invalidateQueries: [BLOG],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    const res = await mutateAsync({
      url: BLOG,
      postData,
    });

    if (res?.success) {
      onClose();
    }
  };

  return (
    <div>
      <Button variant="shadow" onClick={onOpen}>
        Add Blog
      </Button>
      <Modal
        backdrop="blur"
        classNames={{
          closeButton: "right-2 top-2",
        }}
        isOpen={isOpen}
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Add blog</ModalHeader>
          <ModalBody>
            {/* <ReactQuill
              className="mb-14"
              modules={modules}
              placeholder="Enter post comment"
              theme="snow"
              value={content}
              onChange={setContent}
            /> */}
            <Form validationBehavior="native" onSubmit={onSubmit}>
              <Input
                isRequired
                errorMessage="Please enter a title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter title"
              />
              <Textarea
                isRequired
                errorMessage="Please enter a content"
                label="Content"
                labelPlacement="outside"
                minRows={10}
                name="content"
                placeholder="Enter content"
              />
              <Button isLoading={isPending} type="submit" variant="bordered">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateBlog;
