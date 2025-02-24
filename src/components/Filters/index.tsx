'use client'

import React, { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import FilterControls from "./FillterControls";
import { cn } from "@/lib/utils";

export default function GameFilters() {
  const categories = useCategories();
  const platforms = usePlatfroms();
  return (
    <>
      <div className="h-full">
        <div className=" bg-neutral-900 w-full rounded-xl pb-8 sticky top-4 min-h-screen lg:w-80">
          <div className="flex gap-3 items-center justify-between px-8 py-6">
            <p className=" font-semibold ">Filters</p>
            <Link
              className={cn(
                "font-bold uppercase text-blue-400 text-sm",
                buttonVariants({ variant: "ghost", size: "sm" })
              )}
              href={"/search"}
            >
              Reset
            </Link>
          </div>
          <Separator />
          <div className="px-8 py-6">
            <FilterControls categories={categories} platforms={platforms} />
          </div>
        </div>
      </div>
    </>
  );
}

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      // Your fetch logic here
    }
    fetchCategories();
  }, []);

  return categories;
}

function usePlatfroms() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    async function fetchPlatforms() {
      // Your fetch logic here
    }
    fetchPlatforms();
  }, []);

  return platforms;
}
