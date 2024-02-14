"use client";

import {Bars3BottomRightIcon, HomeIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import {useMemo} from "react";

export const Go = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const onClick = () => {
    if (isHome) {
      const menuSection = document.getElementById("menu-section");
      if (menuSection) {
        menuSection.scrollIntoView({behavior: "smooth"});
      }
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={onClick}>
      <div className="ml-auto">
        {isHome ? (
          <Bars3BottomRightIcon className="h-8 w-8" />
        ) : (
          <HomeIcon className="h-8 w-8" />
        )}
      </div>
    </button>
  );
};
