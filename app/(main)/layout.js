import React from "react";

const MainLayout = async ({ children }) => {
  return <div className="mx-auto max-w-7xl w-full mt-24 mb-20 px-6 md:px-10">{children}</div>;
};

export default MainLayout;