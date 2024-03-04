"use client";
import SectionHeader from "@/components/section-header";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

function CreateBillboardPage() {
  return (
    <>
      <header>
        <SectionHeader
          title="Create Billboard"
          description="Add a new billboard"
        />
      </header>
      <div className="">
        <CldUploadWidget uploadPreset="<Your Upload Preset>">
          {({ open }) => {
            return <button onClick={() => open()}>Upload an Image</button>;
          }}
        </CldUploadWidget>
      </div>
    </>
  );
}

export default CreateBillboardPage;
