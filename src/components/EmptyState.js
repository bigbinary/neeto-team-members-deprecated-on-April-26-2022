import React from "react";

import classnames from "classnames";
import EmptyStateSVG from "./EmptyStateSVG";
import { Typography } from "@bigbinary/neetoui";

const EmptyState = ({ title, className }) => {
  return (
    <div
      data-cy="empty-state-container"
      className={classnames([
        "flex flex-row items-start w-full justify-start h-full",
        className,
      ])}
    >
      <div className="m-auto text-center">
        <div
          data-cy="empty-state-image-container"
          className="flex items-center justify-center m-auto mb-8"
        >
          <EmptyStateSVG />
        </div>
        <Typography
          component="h2"
          style="h2"
          weight="semibold"
          className="mb-4"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default EmptyState;
