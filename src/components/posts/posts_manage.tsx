"use client";
import { useCallback, useState } from "react";

import Search from "@/components/ui/search";
import Notify from "@/components/toast/notify";
import PostsTable from "@/components/posts/table_posts";
import AddPostModal from "@/components/modals/add_post_modal";
import FormPostButton from "@/components/buttons/button_form_post";

import { IPost } from "@/interfaces";

const PostsManage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState("");

  const [cleanData, setCleanData] = useState<IPost>({
    id: 0,
    body: "",
    title: "",
    userId: 0,
  });

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <>
      <div className="flex justify-between gap-3 items-end py-2.5 mr-2 mb-2 ">
        <div className="min-w-64">
          <FormPostButton setIsFormOpen={setIsFormOpen} />
        </div>
        <Search
          page={page}
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
    </>
  );
};
export default PostsManage;
