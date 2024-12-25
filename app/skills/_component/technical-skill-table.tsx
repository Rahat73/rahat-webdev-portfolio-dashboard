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
  { key: "icon", label: "ICON" },
  { key: "source", label: "SOURCE" },
  { key: "label", label: "LABEL" },
  { key: "actions", label: "ACTIONS" },
];

export type TechnicalSkill = {
  _id: string;
  icon: string;
  source: string;
  label: string;
};

const TechnicalSkillTable = ({
  skill = [],
  isFetching,
}: {
  skill: TechnicalSkill[];
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
        {(item: TechnicalSkill) => (
          <TableRow key={item._id}>
            {(columnKey) => {
              if (columnKey === "actions") {
                return (
                  <TableCell>
                    <EditSkill skillData={item} type="technical" />
                    <DeleteSkill id={item._id} type="technical" />
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

export default TechnicalSkillTable;
