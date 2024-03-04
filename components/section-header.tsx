import React from "react";

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export default SectionHeader;
