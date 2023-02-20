const ISSUE_ICONS: { [key: string]: JSX.Element } = {
  TASK: <img src="/icons/Task.svg" alt="task" />,
  STORY: <img src="/icons/Story.svg" alt="story" />,
  BUG: <img src="/icons/Bug.svg" alt="bug" />,
  EPIC: <img src="/icons/Epic.svg" alt="epic" />,
};

const issueStatusColorCodes: { [key: string]: string } = {
  IN_PROG: "cyan",
  DONE: "green",
  TESTING: "magenta",
  TESTED: "gold",
  BLOCKED: "red",
  TODO: "purple",
};

enum issueStatus {
  IN_PROG = "IN_PROG",
  DONE = "DONE",
  TESTING = "TESTING",
  TESTED = "TESTED",
  BLOCKED = "BLOCKED",
  TODO = "TODO",
}

const ESTIMATE = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "5", value: "5" },
  { label: "8", value: "8" },
  { label: "13", value: "13" },
];

const ISSUE_STATUS = [
  { label: "INPROGRESS", value: "IN_PROG" },
  { label: "DONE", value: "DONE" },
  { label: "TESTING", value: "TESTING" },
  { label: "TESTED", value: "TESTED" },
  { label: "BLOCKED", value: "BLOCKED" },
  { label: "TODO", value: "TODO" },
];
const ISSUE_TYPE = [
  { label: "TASK", value: "TASK" },
  { label: "STORY", value: "STORY" },
  { label: "BUG", value: "BUG" },
  { label: "EPIC", value: "EPIC" },
];
const PRIORITY = [
  { label: "HIGH", value: "HIGH" },
  { label: "MEDIUM", value: "MEDIUM" },
  { label: "LOW", value: "LOW" },
];
export {
  ISSUE_ICONS,
  issueStatusColorCodes,
  issueStatus,
  ESTIMATE,
  ISSUE_STATUS,
  ISSUE_TYPE,
  PRIORITY,
};
