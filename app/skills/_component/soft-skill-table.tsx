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

import EditSkill from "./edit-skill";
import DeleteSkill from "./delete-skill";

const columns = [
  { key: "content", label: "CONTENT" },
  { key: "actions", label: "ACTIONS" },
];

export type SoftSkill = {
  _id: string;
  content: string;
};

const SoftSkillTable = ({
  skill = [],
  isFetching,
}: {
  skill: SoftSkill[];
  isFetching: boolean;
}) => {
  return (
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
        items={skill}
        loadingContent={<Spinner />}
      >
        {(item: SoftSkill) => (
          <TableRow key={item._id}>
            {(columnKey) => {
              if (columnKey === "actions") {
                return (
                  <TableCell>
                    <EditSkill skillData={item} type="soft" />
                    <DeleteSkill id={item._id} type="soft" />
                  </TableCell>
                );
              }

              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SoftSkillTable;
