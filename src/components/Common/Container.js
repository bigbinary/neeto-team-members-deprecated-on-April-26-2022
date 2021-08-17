import React from "react";

const Container = ({ children }) => {
  return <div className="w-full overflow-y-hidden bg-white">{children}</div>;
};

export default Container;
