"use client";
// TODO: Decompose urgent this component !!!!!.

import { useCallback, useEffect, useMemo, useState } from "react";

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

import { toast } from "react-toastify";
import { columns } from "./columns";
import { EditIcon } from "../icons/edit_icon";
import { DeleteIcon } from "../icons/delete_icon";

export default function PostsTable({
  data,
  setData,
  setCleanData,
  setIsFormOpen,
}: {
  data: IPost[];
  setData: (arr: IPost[]) => void;
  setCleanData: (post: IPost) => void;
  setIsFormOpen: (value: boolean) => void;
}) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  //Start Pagination
  const rowsPerPage = 4;

  const pages = useMemo(() => {
    return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
  }, [data, data?.length]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);
  //END Pagination

  /* Refresh posts */
  const handleDeleteData = (id: number) => {
    /* ----------------------------------------------------
  TODO: Fix -> Only the deletion of one post is shown at a time,
  and if another post is deleted again, 
  the previous element already deleted appears again  
  -------------------------------------------------------*/
    console.log(id);
    // console.log(data.filter((item) => item.id !== id));
    setData(data.filter((item) => item.id !== id));
  };
  /*  method: 'GET' */
  useEffect(() => {
    try {
      const getPost = async () => {
        const { data: res } = await axios.get(`${API_URL}`);
        setData(res);
      };
      getPost();
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  }, []);

  /* method: 'DELETE' */
  const deletePost = async (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        handleDeleteData(id);
        toast.success("Post deleted successfully ", {
          theme: "dark",
          position: "bottom-right",
          progress: undefined,
          draggable: true,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: false,
        });
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
        toast.error("Error deleting post", {
          theme: "dark",
          position: "bottom-right",
          progress: undefined,
          autoClose: 5000,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: false,
        });
      });
  };

  const handleUpdate = (id: number) => {
    setIsFormOpen(true);
    setCleanData(data.find((post) => post.id === id) as IPost);
  };

  // Render Cell Post
  const renderCell = useCallback(
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
            <div className="relative flex items-center gap-0">
              <Tooltip content="Edit post">
                <Button
                  type="button"
                  variant="light"
                  name="Edit post"
                  onPress={() => handleUpdate(data.id)}
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
                  // onPress={onOpen}
                  onClick={() => deletePost(data.id)}
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
    [data.length, data]
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
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      bottomContentPlacement="outside"
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
  );
}
