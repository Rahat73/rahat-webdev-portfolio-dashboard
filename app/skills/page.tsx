"use client";

import { Tab, Tabs } from "@nextui-org/tabs";

import TechnicalSkillTable from "./_component/technical-skill-table";
import SoftSkillTable from "./_component/soft-skill-table";
import AddSkill from "./_component/add-skill";

import { SKILL } from "@/api-endpoints";
import { useFetchData } from "@/hooks/fetch.hook";

const Skills = () => {
  const { data = [], isFetching } = useFetchData(SKILL);

  return (
    <div>
      <div className="flex justify-between items-center border-b-1 pb-3 mb-10">
        <p className="text-3xl text-center">Skill</p>
        <AddSkill />
      </div>
      <Tabs aria-label="Options">
        <Tab key="technical" title="Technical">
          <TechnicalSkillTable
            isFetching={isFetching}
            skill={data?.[0]?.technical}
          />
        </Tab>
        <Tab key="soft" title="Soft">
          <SoftSkillTable isFetching={isFetching} skill={data?.[0]?.soft} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Skills;
