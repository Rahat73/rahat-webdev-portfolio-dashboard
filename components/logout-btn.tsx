"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { logout } from "@/services/auth-service";

const LogoutBtn = () => {
  const router = useRouter();

  return (
    <Button
      color="danger"
      variant="ghost"
      onPress={async () => {
        await logout();
        router.replace("/login");
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
