export interface Workout {
  slug: string,
  name: string,
  duration: number,
  difficulty: Difficulty,
  sequence: Array<SequenceItem>
}

export interface SequenceItem {
  slug: string,
  name: string,
  type: SequenceType,
  duration: number,
  reps?: number
}

export type Difficulty = "excercise" | "stretch" | "break"
export type SequenceType = "easy" | "normal" | "hard"
