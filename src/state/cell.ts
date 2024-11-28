import { CellType } from "../enums";

export type CellTypes = CellType.CODE | CellType.TEXT;

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
