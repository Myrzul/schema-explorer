"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchDialog from "./SearchDialog";

const navItems = [
  { label: "Carte", href: "/carte" },
  { label: "Cascade", href: "/cascade" },
  { label: "Fiches", href: "/fiches" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm px-6 h-14 flex items-center justify-between shrink-0">
      {/* Left: Logo / Title */}
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-slate-800 hover:text-slate-600 transition-colors"
      >
        SchemaExplorer
      </Link>

      {/* Center: Navigation tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right: Search */}
      <SearchButton />

      {/* Search dialog */}
      <SearchDialog />
    </nav>
  );
}

function SearchButton() {
  const handleClick = useCallback(() => {
    // Dispatch Cmd+K to open the search dialog
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-slate-500 hover:text-slate-700"
      onClick={handleClick}
    >
      <Search className="w-[18px] h-[18px]" />
      <span className="sr-only">Rechercher (⌘K)</span>
    </Button>
  );
}
