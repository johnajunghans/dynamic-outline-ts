export interface Block {
  id: number;
  description: string;
  children: Block[];
}
