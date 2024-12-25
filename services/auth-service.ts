"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import axiosInstance from "../lib/axios-instance";

export const loginUser = async (userData: Record<string, any>) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", data?.accessToken);
    }

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    const decodedToken: { email: string } = await jwtDecode(accessToken);

    if (decodedToken.email) {
      return {
        email: decodedToken.email,
      };
    } else {
      return null;
    }
  }

  return null;
};
