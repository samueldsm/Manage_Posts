"use client";

import React, { useState } from "react";

import { useDisclosure } from "@nextui-org/use-disclosure";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import PostsTable from "@/components/posts/table_posts";
import NotifyChip from "@/components/chip/notify";
import DelPostModal from "@/components/modals/del_post_modal";
import AddPostModal from "@/components/modals/add_post_modal";
import FormPostButton from "@/components/modals/button_form_post";

import { IPost } from "@/interfaces";

export default function HomePage() {
  const [data, setData] = useState<IPost[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<IPost>({
    id: 0,
    body: "",
    title: "",
    userId: 0,
  });
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="purple-dark text-foreground bg-background">
        <CardHeader>
          <h1 className="font-bold">Posts</h1>
        </CardHeader>

        <CardBody>
          <FormPostButton setIsFormOpen={setIsFormOpen} />

          <AddPostModal
            data={data}
            setData={setData}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            initialData={initialData}
            setInitialData={setInitialData}
          />

          {visible && <NotifyChip />}

          <PostsTable
            data={data}
            setData={setData}
            setIsFormOpen={setIsFormOpen}
          />

          {/* TODO: Use this modal to confirm the deletion */}
          <DelPostModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </CardBody>
      </Card>
    </>
  );
}
