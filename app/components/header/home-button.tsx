"use client";

import {HomeIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import {useMemo} from "react";

export const HomeButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const onClick = () => {
    if (!isHome) {
      router.push("/");
    }
  };

  return (
    <button onClick={onClick}>
      <div className="ml-auto mr-2">
        {isHome ? null : <HomeIcon className="h-8 w-8" />}
      </div>
    </button>
  );
};
