import { create } from "zustand";

export interface Block {
  id: string;
  serial: number;
  children: Block[];
}

interface BlocksState {
  rootBlock: Block;
  addBlock: (parentId: string) => void;
}

let nextSerial = 0;

const createBlock = (): Block => ({
  id: String(Date.now()),
  serial: nextSerial++,
  children: [],
});

export const useBlocks = create<BlocksState>((set) => ({
  rootBlock: createBlock(),

  addBlock: (parentId: string) =>
    set((state) => {
      const newBlock = createBlock();

      const addToParent = (block: Block, parentId: string): Block => {
        if (block.id === parentId) {
          return {
            ...block,
            children: [...block.children, newBlock],
          };
        }

        return {
          ...block,
          children: block.children.map((child) => addToParent(child, parentId)),
        };
      };

      const updatedRootBlock = addToParent(state.rootBlock, parentId);

      return {
        rootBlock: updatedRootBlock,
      };
    }),
}));
