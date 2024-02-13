"use client";
import { useUser } from "@clerk/nextjs";

export function UserName() {
  const { user } = useUser();
  return (
    <div className="mt-1 ml-2 uppercase">{user?.username}</div>
  );
}
