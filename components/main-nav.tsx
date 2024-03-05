"use server";
import React from "react";
import Navbar from "./ui/navbar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

async function MainNav() {
  const { userId } = auth();
  const stores = await db.store.findMany({
    where: {
      userId: userId!,
    },
  });

  return <Navbar stores={stores} />;
}

export default MainNav;
