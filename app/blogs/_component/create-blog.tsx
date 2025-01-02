"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import dynamic from "next/dynamic";

import { usePostData } from "@/hooks/mutation.hook";
import { BLOG } from "@/api-endpoints";

import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutateAsync, isPending } = usePostData({
    invalidateQueries: [BLOG],
  });

  const isQuillEmpty = () => {
    const quillEditor = document.querySelector(".ql-editor") as HTMLElement;

    return quillEditor?.innerText.trim().length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = Object.fromEntries(formData);

    if (isQuillEmpty()) {
      setContentError("Content cannot be empty");

      return;
    } else {
      setContentError("");
    }

    const res = await mutateAsync({
      url: BLOG,
      postData: {
        ...postData,
        content,
      },
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
            <Form validationBehavior="native" onSubmit={onSubmit}>
              <Input
                isRequired
                errorMessage="Please enter a title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter title"
              />

              <ReactQuill
                className="h-40 mb-14 w-full"
                modules={modules}
                placeholder="Enter content"
                theme="snow"
                value={content}
                onChange={setContent}
              />
              {contentError && (
                <div className="text-sm text-red-500">{contentError}</div>
              )}
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
