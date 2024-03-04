"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

function AddButton({ path }: { path: string }) {
  const router = useRouter();
  return (
    <Button size="sm" onClick={() => router.push(path)}>
      <Plus className="w-5 h-5 mr-2" />
      Add New
    </Button>
  );
}

export default AddButton;
