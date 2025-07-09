import React from "react";
import { Button } from "flowbite-react";

const InformationSection = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button color="alternative">Alternative</Button>
      <Button color="dark">Dark</Button>
      <Button color="light">Light</Button>
      <Button color="green">Green</Button>
      <Button color="red">Red</Button>
      <Button color="yellow">Yellow</Button>
      <Button color="purple">Purple</Button>
    </div>
  );
};

export default InformationSection;
