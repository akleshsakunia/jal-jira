import { Dispatch, SetStateAction } from "react";
import AddProject from "./AddProject";
export default ({
  open,
  setOpen,
  openModalKey,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openModalKey: string | undefined;
}) => {
  return (
    <>
      <AddProject
        open={open && openModalKey === "addProject"}
        setOpen={setOpen}
      />
    </>
  );
};
