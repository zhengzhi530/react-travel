import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;

interface PropsType {
  onSelect?: () => void;
  children: string;
}

export const FilterTag: React.FC<PropsType> = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked:any) => {
    setChecked(checked);
  };

  return <CheckableTag {...props} checked={checked} onChange={handleChange} />;
};
