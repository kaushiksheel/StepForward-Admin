"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../spinner";

export function CreateStoreModal({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreateStore = async () => {
    setLoading(true);
    try {
      const store = await axios.post("/api/stores", {
        data: {
          name,
        },
      });
      setLoading(false);
      toast.success("Store created successfully");
      router.push(`/${store.data.id}/billboards`);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to create store");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Store</DialogTitle>
          <DialogDescription>
            Create a new store to start selling your products.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Store Name
            </Label>
            <Input
              id="name"
              defaultValue="Shoe Store"
              className="col-span-3"
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateStore} type="submit">
            {loading ? <Spinner /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
