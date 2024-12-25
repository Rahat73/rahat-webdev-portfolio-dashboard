"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { ExternalLink, Github } from "lucide-react";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Spinner } from "@nextui-org/spinner";

import AddProject from "./_component/add-project";
import EditProject from "./_component/edit-project";
import DeleteProject from "./_component/delete-project";

import { useFetchData } from "@/hooks/fetch.hook";
import { PROJECT } from "@/api-endpoints";
import { truncateDescription } from "@/utils";
import { GithubIcon } from "@/components/icons";

export type Project = {
  _id: string;
  name: string;
  technologies: string[];
  description: string;
  image: string;
  liveLink: string;
  githubLinkFront: string;
  githubLinkBack: string;
};

const columns = [
  { key: "name", label: "PROJECT" },
  { key: "technologies", label: "TECHNOLOGIES" },
  { key: "description", label: "DESCRIPTION" },
  { key: "links", label: "LINKS" },
  { key: "actions", label: "ACTIONS" },
];

const renderCell = (project: Project, columnKey: React.Key) => {
  switch (columnKey) {
    case "name":
      return (
        <div className="flex items-center space-x-3">
          <Avatar color="primary" size="lg" src={project.image} />
          <p>{project.name}</p>
        </div>
      );
    case "technologies":
      return (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Chip key={tech} size="sm">
              {tech}
            </Chip>
          ))}
        </div>
      );
    case "description":
      return (
        <Tooltip content={project.description}>
          <span>{truncateDescription(project.description)}</span>
        </Tooltip>
      );
    case "links":
      return (
        <div className="flex justify-center space-x-2">
          <Button
            isIconOnly
            aria-label="Live Link"
            as="a"
            color="primary"
            href={project.liveLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            isIconOnly
            aria-label="Frontend GitHub"
            as="a"
            color="secondary"
            href={project.githubLinkFront}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button
            isIconOnly
            aria-label="Backend GitHub"
            as="a"
            color="secondary"
            href={project.githubLinkBack}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon className="w-4 h-4" />
          </Button>
        </div>
      );
    case "actions":
      return (
        <div className="flex justify-center">
          <EditProject project={project} />
          <DeleteProject id={project._id} />
        </div>
      );
    default:
      return null;
  }
};

const PersonalProjects = () => {
  const { data = [], isFetching } = useFetchData(PROJECT);

  return (
    <div>
      <div className="flex justify-between items-center border-b-1 pb-3 mb-10">
        <p className="text-3xl text-center">Personal Projects</p>
        <AddProject />
      </div>
      <Table aria-label="Project table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "links" || "actions" ? "center" : "start"}
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
          {(item: Project) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PersonalProjects;
