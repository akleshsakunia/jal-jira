const issueType: { [key: string]: JSX.Element } = {
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

export { issueType, issueStatusColorCodes, issueStatus };
