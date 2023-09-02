"use client";

import React from "react";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

import FormPostButton from "./button_form_post";

export default function PostModal({
  isFormOpen,
  setIsFormOpen,
}: {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
}) {
  /* TODO: Add validations */
  function handleFormClose(): void {
    setIsFormOpen(false);
  }
  return (
    <>
      <FormPostButton setIsFormOpen={setIsFormOpen} />
      <Modal
        backdrop="blur"
        isOpen={isFormOpen}
        onClose={handleFormClose}
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new Post
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  variant="bordered"
                  autoFocus
                  placeholder="Enter a title"
                />
                <Textarea
                  key="bordered"
                  label="Description"
                  variant="bordered"
                  placeholder="Enter a description"
                  labelPlacement="outside"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  onPress={onClose}
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
