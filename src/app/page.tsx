"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import Notify from "@/components/toast/notify";
import PostsTable from "@/components/posts/table_posts";
import AddPostModal from "@/components/modals/add_post_modal";
import FormPostButton from "@/components/modals/button_form_post";

import { IPost } from "@/interfaces";

export default function HomePage() {
  const [data, setData] = useState<IPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [cleanData, setCleanData] = useState<IPost>({
    id: 0,
    body: "",
    title: "",
    userId: 0,
  });
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
            cleanData={cleanData}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            setCleanData={setCleanData}
          />

          <PostsTable
            data={data}
            setData={setData}
            setIsFormOpen={setIsFormOpen}
            setCleanData={setCleanData}
          />

          <Notify />
        </CardBody>
      </Card>
    </>
  );
}
