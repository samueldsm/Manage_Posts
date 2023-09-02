"use client";

import React, { useState } from "react";

import { useDisclosure } from "@nextui-org/use-disclosure";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import PostModal from "@/components/modals/add_post_modal";
import PostsTable from "@/components/posts/table_posts";
import NotifyChip from "@/components/chip/notify";
import DelPostModal from "@/components/modals/del_post_modal";

import { IPost } from "@/interfaces";

export default function HomePage() {
  const [data, setData] = useState<IPost[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="purple-dark text-foreground bg-background">
        <CardHeader>
          <h1 className="font-bold">Posts</h1>
        </CardHeader>

        <CardBody>
          <PostModal isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />

          {visible && <NotifyChip />}

          <PostsTable
            data={data}
            isOpen={isOpen}
            onOpen={onOpen}
            setData={setData}
            isFormOpen={isFormOpen}
            onOpenChange={onOpenChange}
            setIsFormOpen={setIsFormOpen}
          />

          {/* TODO: Use this modal to confirm the deletion */}
          <DelPostModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </CardBody>
      </Card>
    </>
  );
}
