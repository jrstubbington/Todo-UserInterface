import React, { useState } from "react";

interface ToggleProps {
  id: string;
  clickHandler: (id: string, event: React.MouseEvent<HTMLDivElement>) => void;
}

function Category(props: ToggleProps): JSX.Element {
  const [id] = useState<string>(props.id);
  return <div onClick={(e) => props.clickHandler(id, e)}>{"ID: " + id}</div>;
}

export default Category;
