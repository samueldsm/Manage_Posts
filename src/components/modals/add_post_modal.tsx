"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  const [titleVal, setTitleVal] = useState<string>("");
  const [bodyVal, setBodyVal] = useState<string>("");

  useEffect(() => {
    initialData.title && setTitleVal(initialData.title);
    initialData.body && setBodyVal(initialData.body);
  }, [initialData.title, initialData.body]);

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
      await axios.post(API_URL, tempPost);
    } catch (error) {
      console.error("Error in POST method", error);
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

  /*  method: 'PUT' */
  const updatePost = async () => {
    const seed = {
      id: initialData.id,
      title: titleVal,
      body: bodyVal,
      userId: initialData.userId,
    } as IPost;

    try {
      await axios.put(`${API_URL}/${seed.id}`, seed);
    } catch (error) {
      console.log("Error in PUT method", error);
    }
    const temp = [...data];
    const index = temp.indexOf(initialData);
    temp[index] = { ...initialData, title: titleVal, body: bodyVal };
    setData(temp);
  };

  const onSubmit = async () => {
    if (initialData.id) {
      try {
        await updatePost();
      } catch (error) {
        console.log("Error during update: ", error);
      }
    } else {
      try {
        await createPost();
      } catch (error) {
        console.log("Error during creation: ", error);
      }
    }
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
              maxLength={250}
              minLength={1}
              placeholder="Enter a title"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 250,
                  message: "The name cannot be longer than 250 characters.",
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
