"use client";

import React, { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

import { useForm } from "react-hook-form";

import { IPost } from "@/interfaces";
import { validateTrim } from "@/util/validation";
import axios from "axios";
import { data } from "autoprefixer";

export default function AddPostModal({
  data,
  setData,
  isFormOpen,
  initialData,
  setIsFormOpen,
  setInitialData,
}: {
  data: IPost[];
  setData: (arr: IPost[]) => void;
  isFormOpen: boolean;
  initialData: IPost;
  setIsFormOpen: (value: boolean) => void;
  setInitialData: (post: IPost) => void;
}) {
  const [titleVal, setTitleVal] = useState<string>("");
  const [bodyVal, setBodyVal] = useState<string>("");

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // Validation not only whitespace
  const validateInput = (value: string) => validateTrim(value);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /*If it is closed by accident, the status of the post is not lost,
  it is only lost when clicking cancel*/
  function handleFormClose(): void {
    setIsFormOpen(false);
    reset();
  }
  const handleCancel = () => {
    setBodyVal("");
    setTitleVal("");
    setIsFormOpen(false);
    setInitialData({ userId: 0, title: "", body: "", id: 0 });
    reset();
  };

  /*  method: 'POST' */
  const createPost = async () => {
    const tempPost = {
      body: bodyVal,
      title: titleVal,
      userId: 1,
    };
    try {
      const response = await axios.post(API_URL, tempPost);
      //POST successfully
      console.log("POST: ", response.data);
    } catch (error) {
      console.error(error);
    }
    // Always id= 140 Maybe its can throw an exception.
    setData([
      ...data,
      {
        ...tempPost,
        id: 140,
      },
    ]);
  };

  const onSubmit = () => {
    createPost();
    handleCancel();
  };

  return (
    <Modal
      isOpen={isFormOpen}
      onClose={handleFormClose}
      // TODO: Fix backdrop="blur", it's not working
      backdrop="blur"
      classNames={{
        body: "py-6",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add a new Post
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Input
              type="text"
              label="Title"
              value={titleVal}
              variant="bordered"
              autoFocus
              maxLength={50}
              minLength={1}
              placeholder="Enter a title"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 50,
                  message: "The name cannot be longer than 50 characters.",
                },
                minLength: {
                  value: 1,
                  message: "The name cannot be less than 1 character.",
                },
                validate: validateInput,
                onChange: (e) => setTitleVal(e.target.value),
              })}
            />
            {errors.title && typeof errors.title?.message === "string" && (
              <p className="errorMessage">{errors.title.message}</p>
            )}
            <Textarea
              key="bordered"
              label="Description"
              value={bodyVal}
              variant="bordered"
              placeholder="Enter a description"
              labelPlacement="outside"
              {...register("body", {
                required: "Description is required",
                maxLength: {
                  value: 250,
                  message: "The name cannot be longer than 250 characters.",
                },
                validate: validateInput,
                onChange: (e) => setBodyVal(e.target.value),
              })}
            />
            {errors.body && typeof errors.body?.message === "string" && (
              <p className="errorMessage">{errors.body.message}</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
            >
              Add post
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
function updatePost() {
  throw new Error("Function not implemented.");
}
