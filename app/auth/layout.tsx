import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen grid place-content-center">
      {children}
    </div>
  );
}

export default AuthLayout;
