"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function StoreCard({
  id,
  name,
  createdAt,
}: {
  id: string;
  name: string;
  createdAt: Date;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/${id}/settings`);

      toast.success("Store deleted successfully");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.response?.data);
      }
    }
  };
  return (
    <Card key={id}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-xl">
            {name}{" "}
            <span className="text-xs text-gray-500 font-normal">
              {format(new Date(createdAt), "MMM d, yyyy")}
            </span>
          </h3>
          <div className="flex items-center space-x-2">
            <Button onClick={handleDelete} variant="destructive" size="sm">
              <Trash className="w-4 h-4 " />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default StoreCard;
