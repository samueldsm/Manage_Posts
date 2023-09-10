"use client";

import { useEffect, useState } from "react";

import { increment } from "@/redux/features/counter_id_slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

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

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { IPost } from "@/interfaces";
import { validateTrim } from "@/util/validation";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const AddPostModal = ({
  data,
  setData,
  cleanData,
  isFormOpen,
  setCleanData,
  setIsFormOpen,
}: {
  data: IPost[];
  setData: (arr: IPost[]) => void;
  cleanData: IPost;
  isFormOpen: boolean;
  setCleanData: (post: IPost) => void;
  setIsFormOpen: (value: boolean) => void;
}) => {
  const [bodyVal, setBodyVal] = useState<string>("");
  const [titleVal, setTitleVal] = useState<string>("");

  useEffect(() => {
    cleanData.title && setTitleVal(cleanData.title);
    cleanData.body && setBodyVal(cleanData.body);
  }, [cleanData]);

  const countId = useAppSelector((state) => state.counterId.value);
  const dispatch = useAppDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCancelOrClose = () => {
    setBodyVal("");
    setTitleVal("");
    setIsFormOpen(false);
    setCleanData({ userId: 0, title: "", body: "", id: 0 });
    reset();
  };

  const onSubmit = async () => {
    if (cleanData.id) {
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
    handleCancelOrClose();
  };

  /*  method: 'POST' */
  const createPost = async () => {
    const tempPost = {
      body: bodyVal,
      title: titleVal,
      userId: 1,
    };
    await axios
      .post(baseURL, tempPost)
      .then(() => {
        /* Correctly in a real environment : setData([ response.data, ...data,]); */
        setData([
          {
            ...tempPost,
            id: countId,
          },
          ...data,
        ]);
        dispatch(increment());
        toast.success("The post was created successfully");
      })
      .catch((error) => {
        console.error("Error in POST method", error);
        toast.error("Error during insert");
      });
  };

  /*  method: 'PUT' */

  const updatePost = async () => {
    /*  In this example you are not allowed to edit a post
         that has been embedded. Because it's a fake API
    */
    const seed = {
      id: cleanData.id,
      title: titleVal,
      body: bodyVal,
      userId: cleanData.userId,
    } as IPost;

    axios
      .put(`${baseURL}/${seed.id}`, seed)
      .then(() => {
        const temp = [...data];
        const index = temp.indexOf(cleanData);
        temp[index] = { ...cleanData, title: titleVal, body: bodyVal };
        setData(temp);

        toast.success("The post was successfully updated");
      })
      .catch((error) => {
        console.log("Error in PUT method", error);
        toast.error("Error during update");
      });
  };

  // Validation not only whitespace
  const validateInput = (value: string) => validateTrim(value);

  return (
    <Modal
      isOpen={isFormOpen}
      onClose={handleCancelOrClose}
      backdrop="blur"
      classNames={{
        body: "py-6",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {cleanData.title ? "Edit post" : "Add a new Post"}
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
              labelPlacement="outside"
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
              type="text"
              key="bordered"
              label="Description"
              value={bodyVal}
              variant="bordered"
              placeholder="Enter a description"
              labelPlacement="outside"
              {...register("body", {
                required: "Description is required",
                validate: validateInput,
                onChange: (e) => setBodyVal(e.target.value),
              })}
            />
            {errors.body && typeof errors.body?.message === "string" && (
              <p className="errorMessage">{errors.body.message}</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onClick={handleCancelOrClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
            >
              {cleanData.title ? "Update post" : "Add post"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
