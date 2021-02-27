export type AtCoderProblemType = {
  id: number
  epoch_second: number
  problem_id: string
  contest_id: string
  user_id: string
  language: string
  point: number
  length: number
  result: string
  execution_time: number
}

export type AizuProblemType = {
  judgeId: number
  judgeType: number
  userId: string
  problemId: string
  submissionDate: number
  language: string
  status: number
  cpuTime: number
  memory: number
  codeSize: number
  accuracy: string
  judgeDate: number
  score: number
  problemTitle: string | null
  token: string | null
}
