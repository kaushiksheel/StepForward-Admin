"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Copy, Database } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useOrigin } from "@/hooks/useOrigin";
import { useParams } from "next/navigation";

function ApiCard({ path }: { path: string }) {
  const { storeId } = useParams();
  const origin = useOrigin();

  const apiLink = `${origin}/api/${storeId}${path}`;
  const handleClick = () => {
    navigator.clipboard.writeText(apiLink);
    toast.success("Copied to clipboard");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <h3 className="font-medium text-lg">GET</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex-col flex sm:flex-row sm:items-center sm:justify-between">
          <p className="bg-gray-200 dark:bg-gray-800 px-2">{apiLink}</p>
          <Button onClick={handleClick} size="sm" variant="outline">
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ApiCard;
