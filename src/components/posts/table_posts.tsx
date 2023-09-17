"use client";

import { Key, useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Spinner } from "@nextui-org/spinner";
import { Pagination } from "@nextui-org/pagination";

import { toast } from "react-toastify";

import { columns } from "./columns";
import { EditIcon } from "../icons/edit_icon";
import { DeleteIcon } from "../icons/delete_icon";

import { IPost } from "@/interfaces";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const PostsTable = ({
  page,
  data,
  setPage,
  setData,
  filterValue,
  setCleanData,
  setIsFormOpen,
}: {
  page: number;
  data: IPost[];
  setPage: (value: number) => void;
  setData: (arr: IPost[]) => void;
  filterValue: string;
  setCleanData: (post: IPost) => void;
  setIsFormOpen: (value: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  /*  method: 'GET' */
  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        setData(response.data as IPost[]);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);

  /* The `filteredItems` constant is using the `useMemo` 
  hook to memoize the filtered posts based on
  the search filter value. */
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredPost = [...data];
    if (hasSearchFilter) {
      setIsLoading(false);
      filteredPost = filteredPost.filter((post) =>
        post.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    console.log("Filtered Items:", filteredPost);
    return filteredPost;
  }, [data, filterValue]);

  //Start Pagination
  const rowsPerPage = 4;
  const pages = useMemo(() => {
    console.log("Pages:", data);
    return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
  }, [data, data?.length]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    console.log("iTEMS:", filteredItems);
    return filteredItems.slice(start, end);
  }, []);
  //END Pagination

  const handleUpdate = (id: number) => {
    const editableData = data.find((post) => post.id === id);
    setCleanData(editableData as IPost);
    console.log(id);
    setIsFormOpen(true);
  };

  const handleDeleteData = (id: number) => {
    const remainingData = data.filter((item) => item.id !== id);
    setData(remainingData);
  };

  /* method: 'DELETE' */
  const deletePost = async (id: number) => {
    console.log(renderCell.length);
    await axios
      .delete(`${baseURL}/${id}`)
      .then(() => {
        handleDeleteData(id);
        toast.success("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
        toast.error("Error deleting post");
      });
  };

  // Render Cell Post
  const renderCell = useCallback(
    (item: IPost, columnKey: Key) => {
      const cellValue = item[columnKey as keyof IPost];

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "body":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-0">
              <Tooltip content="Edit post">
                <Button
                  type="button"
                  variant="light"
                  name="Edit post"
                  onPress={() => handleUpdate(item.id)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete post">
                <Button
                  type="button"
                  variant="light"
                  name="Delete post"
                  //Add delete confirmation
                  // onPress={onOpen}
                  onClick={() => deletePost(item.id)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [data]
  );

  return (
    <Table
      aria-label="List of posts"
      classNames={{
        wrapper: "min-h-[222px]",
        table: "min-w-[800px]",
      }}
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              page={page}
              total={pages}
              color="primary"
              onChange={(page) => setPage(page)}
              isCompact
              showShadow
              showControls
            />
          </div>
        ) : null
      }
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {({ uid, name }) => (
          <TableColumn key={uid} align={uid === "actions" ? "center" : "start"}>
            {name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        isLoading={isLoading && !items.length}
        emptyContent={!isLoading && items.length === 0 && "No posts found"}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PostsTable;
