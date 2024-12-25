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

import EditExperience from "./_component/edit-experience";
import AddExperience from "./_component/add-experience";
import DeleteExperience from "./_component/delete-experience";

import { EXPERIENCE } from "@/api-endpoints";
import { useFetchData } from "@/hooks/fetch.hook";
import { formatDate } from "@/utils";

export type Experience = {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
};

const columns = [
  { key: "title", label: "TITLE" },
  { key: "company", label: "COMPANY" },
  { key: "location", label: "LOCATION" },
  { key: "startDate", label: "START DATE" },
  { key: "endDate", label: "END DATE" },
  { key: "description", label: "DESCRIPTION" },
  { key: "actions", label: "ACTIONS" },
];

const Experience = () => {
  const { data = [], isFetching } = useFetchData(EXPERIENCE);

  return (
    <div>
      <div className="flex justify-between items-center border-b-1 pb-3 mb-10">
        <p className="text-3xl text-center">Experience</p>
        <AddExperience />
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
          {(item: Experience) => (
            <TableRow key={item._id}>
              {(columnKey) => {
                if (columnKey === "actions") {
                  return (
                    <TableCell>
                      <EditExperience experience={item} />
                      <DeleteExperience id={item._id} />
                    </TableCell>
                  );
                } else if (
                  columnKey === "startDate" ||
                  columnKey === "endDate"
                ) {
                  return (
                    <TableCell>
                      {item[columnKey] ? formatDate(item[columnKey]) : "-"}
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

export default Experience;
