// types.ts (或其他共享文件)
export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Song {
    id: number;
    title: string;
    artist: string;
    url: string;
    duration: string
}