"use client";
// TODO: Decompose urgent this component !!!!!.

import React, { useEffect } from "react";

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

import { IPost } from "@/interfaces";

import { columns } from "./columns";
import { EditIcon } from "../icons/edit_icon";
import { DeleteIcon } from "../icons/delete_icon";

export default function PostsTable({
  data,
  setData,
  setIsFormOpen,
  setInitialData,
}: {
  data: IPost[];
  setData: (arr: IPost[]) => void;
  setIsFormOpen: (value: boolean) => void;
  setInitialData: (post: IPost) => void;
}) {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  /* Refresh posts */
  const handleData = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };
  /*  method: 'GET' */
  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(`${API_URL}`);
      setData(res);
    };
    try {
      getPost();
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  }, []);

  /* method: 'DELETE' */
  const deletePost = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
    handleData(id);
  };
  /* TODO: fixes the pagination, when starting the
     rendering it repeats the value 1 in this component */
  //Start Pagination
  const rowsPerPage = 4;
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data?.length]);

  //END Pagination

  const handleUpdate = (id: number) => {
    setIsFormOpen(true);
    setInitialData(data.find((post) => post.id === id) as IPost);
  };

  // Render Cell Post
  const renderCell = React.useCallback(
    (data: IPost, columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof IPost];

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
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit post">
                <Button
                  type="button"
                  variant="light"
                  onPress={() => handleUpdate(data.id)}
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete post">
                <Button
                  type="button"
                  variant="light"
                  // onPress={onOpen}
                  onClick={() => deletePost(data.id)}
                >
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [data.length]
  );

  return (
    <>
      <Table
        aria-label="List of"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              page={page}
              total={pages}
              color="secondary"
              onChange={(page) => setPage(page)}
              isCompact
              showShadow
              showControls
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading && !items.length}
          loadingContent={<Spinner />}
        >
          {(items) => (
            <TableRow key={items.id}>
              {(columnKey) => (
                <TableCell>{renderCell(items, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
