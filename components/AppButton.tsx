import React from "react";
import { Button } from "@nextui-org/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AppButtonProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const AppButton: React.FC<AppButtonProps> = ({ href, label, icon: Icon }) => {
  return (
    <Link href={href}>
      <Button className="w-60 h-60 p-4 relative text-left bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        <span className="text-xl font-bold">{label}</span>
        <Icon className="absolute bottom-2 right-2" height={36} width={36} />
      </Button>
    </Link>
  );
};

export default AppButton;
