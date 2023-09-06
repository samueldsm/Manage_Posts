"use client";
import { useCallback, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import Search from "@/components/ui/search";
import Notify from "@/components/toast/notify";
import PostsTable from "@/components/posts/table_posts";
import AddPostModal from "@/components/modals/add_post_modal";
import FormPostButton from "@/components/buttons/button_form_post";

import { IPost } from "@/interfaces";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [cleanData, setCleanData] = useState<IPost>({
    id: 0,
    body: "",
    title: "",
    userId: 0,
  });

  /**************** *
   *      SEARCH    *
   * *****************/
  const [filterValue, setFilterValue] = useState("");

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  /***************** *
   *   END SEARCH    *
   * ****************/
  return (
    <>
      <Card className="purple-dark text-foreground bg-background">
        <CardHeader>
          <h1 className="font-bold">Posts</h1>
        </CardHeader>

        <CardBody>
          <div className="flex justify-between gap-3 items-end py-2.5 mr-2 mb-2 ">
            <div className="min-w-64">
              <FormPostButton setIsFormOpen={setIsFormOpen} />
            </div>

            <Search
              page={page}
              setPage={setPage}
              filterValue={filterValue}
              onSearchChange={onSearchChange}
              setFilterValue={setFilterValue}
            />
          </div>
          <PostsTable
            data={data}
            page={page}
            setData={setData}
            setPage={setPage}
            filterValue={filterValue}
            setCleanData={setCleanData}
            setIsFormOpen={setIsFormOpen}
            onSearchChange={onSearchChange}
          />
          <AddPostModal
            data={data}
            setData={setData}
            cleanData={cleanData}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            setCleanData={setCleanData}
          />
          <Notify />
        </CardBody>
      </Card>
    </>
  );
}
