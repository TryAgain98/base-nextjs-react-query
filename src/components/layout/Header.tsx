"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="relative flex justify-center items-center py-4 px-2">
      <ChevronLeftIcon className="absolute left-2 h-6 w-6 cursor-pointer" onClick={() => router.back()} />
      <div>{title}</div>
    </div>
  );
}

export default Header;
