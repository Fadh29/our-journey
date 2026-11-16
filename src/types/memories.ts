export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  image: string;
  caption: string;
  rotation?: string; // e.g. '-rotate-2', 'rotate-1'
  tag?: string;
}
