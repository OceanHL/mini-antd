import React, { useState } from "react";

import type { FC, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
}
const Dragger: FC<DraggerProps> = props => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);

  const klass = classNames("antd-uploader-dragger", {
    "is-dragover": dragOver,
  });

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    console.log("e", e);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  return (
    <div
      className={klass}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
