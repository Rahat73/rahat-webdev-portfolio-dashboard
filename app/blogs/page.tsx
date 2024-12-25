"use client";

import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";

import CreateBlog from "./_component/create-blog";
import DeleteBlog from "./_component/delete-blog";
import EditBlog from "./_component/edit-blog";

import { useFetchData } from "@/hooks/fetch.hook";
import { BLOG } from "@/api-endpoints";

export type Blog = {
  _id: string;
  title: string;
  content: string;
};

const columns = [
  { key: "title", label: "Title" },
  { key: "content", label: "Content" },
  { key: "actions", label: "Actions" },
];

const Blogs = () => {
  const { data = [], isFetching } = useFetchData(BLOG);

  return (
    <div>
      <div className="flex justify-between items-center border-b-1 pb-3 mb-10">
        <p className="text-3xl text-center">Blogs</p>
        <CreateBlog />
      </div>
      <Table aria-label="Experience table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="No data found"
          isLoading={isFetching}
          items={data}
          loadingContent={<Spinner />}
        >
          {(item: Blog) => (
            <TableRow key={item._id}>
              {(columnKey) => {
                if (columnKey === "actions") {
                  return (
                    <TableCell>
                      <EditBlog blog={item} />
                      <DeleteBlog id={item._id} />
                      asd
                    </TableCell>
                  );
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Blogs;
