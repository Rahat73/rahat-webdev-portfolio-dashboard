"use client";

import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginUser } from "@/services/auth-service";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const res = await loginUser(data);

    if (res.success) {
      toast.success("Logged in successfully");
      router.replace("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <p className="text-3xl">Welcome to Dashboard</p>
      <p className="text-2xl">Let&apos;s get logged in!</p>

      <Form
        className="w-full max-w-xs my-10"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          endContent={
            <Eye
              className="text-2xl text-default-400 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          }
          errorMessage="Please enter your password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type={`${showPass ? "text" : "password"}`}
        />
        <Button type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
