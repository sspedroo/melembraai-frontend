export interface RegisterEmail {
  title: string;
  content: string;
  hasRepetition: boolean;
  repetitionIntervalDays: number;
  remainingRepetitions: number;
  sendDate: string;
}