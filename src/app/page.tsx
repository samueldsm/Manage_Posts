"use client";

import { useState } from "react";
// import toast from "@/components/toast";

import { useDisclosure } from "@nextui-org/use-disclosure";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import Notify from "@/components/chip/notify";
import PostsTable from "@/components/posts/table_posts";
import AddPostModal from "@/components/modals/add_post_modal";
import FormPostButton from "@/components/modals/button_form_post";

import { IPost } from "@/interfaces";

export default function HomePage() {
  const [data, setData] = useState<IPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<IPost>({
    id: 0,
    body: "",
    title: "",
    userId: 0,
  });
  const { isOpen, onOpenChange } = useDisclosure();
  const [notification, setNotification] = useState(true);

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

          <PostsTable
            data={data}
            setData={setData}
            setIsFormOpen={setIsFormOpen}
            setInitialData={setInitialData}
            setNotification={setNotification}
          />

          <Notify />
        </CardBody>
      </Card>
    </>
  );
}
