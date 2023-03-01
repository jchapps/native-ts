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

export type SequenceType = "excercise" | "stretch" | "break"
export type Difficulty = "Easy" | "Normal" | "Hard"
