export type WorkbookType = {
  problem_id: number;
  title: string;
  url: string;
};

export type ProblemType = {
  id: number;
  title: string;
  url: string;
};

export type ProgramType = {
  id: number;
  title: string;
  description: string;
  problems: ProblemType[];
};
