import {
  createContext,
  createRef,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import AddComments from "./AddComments";
import ListComments from "./ListComments";

export const commentContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export default ({ issueId }: { issueId: number }) => {
  const [shouldTriggerUpdate, setShouldTriggerUpdate] = useState(false);

  return (
    <commentContext.Provider
      value={[shouldTriggerUpdate, setShouldTriggerUpdate]}
    >
      <AddComments issueId={issueId} />
      <ListComments issueId={issueId} />
    </commentContext.Provider>
  );
};
