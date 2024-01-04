import { BlockType } from "../enums/block-type";

export interface Block {
  x: number;
  y: number;
  type: BlockType;
  texture: string;
}
