import React from "react";
import { Briefcase, FolderKanban, BookOpen, Code } from "lucide-react";

import AppButton from "./AppButton";

const NavButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center">
      <AppButton href="/experience" icon={Briefcase} label="Experience" />
      <AppButton
        href="/personal-projects"
        icon={FolderKanban}
        label="Personal Projects"
      />
      <AppButton href="/blogs" icon={BookOpen} label="Blogs" />
      <AppButton href="/skills" icon={Code} label="Skills" />
    </div>
  );
};

export default NavButtons;
