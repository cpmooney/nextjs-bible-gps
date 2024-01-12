"use client";

import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default function AdminOnly({ children }: Props) {
    const { user } = useUser();
    const isAdmin = user?.publicMetadata?.admin ?? false;
    return isAdmin ? children : null;
}