import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <div className="relative flex flex-row gap-4 bg-epic-500">
        <div className="min-h-screen relative hidden xl:block">
          <SideBar />
        </div>
        <div className="p-4 py-4 flex-grow max-w-[1440px] mx-auto md:p-8 md:py-4  lg:p-16 lg:py-8">
          <Header />
          {children}
          <div className=" text-sm text-neutral-500 p-4 text-center">
            GAMESERU
          </div>
        </div>
      </div>
    </SupabaseProvider>
  );
}

export default Layout;
