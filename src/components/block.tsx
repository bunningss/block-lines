import { useState, useRef, useEffect } from "react";
import { useBlocks } from "../hooks/use-blocks";
import type { Block as BlockType } from "../hooks/use-blocks";
import { getRandomPosition } from "../utils/helpers";

interface BlockProps {
  block: BlockType;
}

export const Block: React.FC<BlockProps> = ({ block }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>(
    getRandomPosition()
  );
  const { addBlock } = useBlocks();

  const handleAddChild = () => {
    addBlock(block.id);
  };

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        className="absolute w-28 h-28 bg-pink-600 select-none cursor-move border-slate-300 flex flex-col justify-center items-center gap-3 p-1 font-bold"
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        <span className="text-white">{block.serial}</span>
        <button
          onClick={handleAddChild}
          className="w-full bg-pink-300 p-1 rounded-sm text-pink-600"
        >
          +
        </button>
      </div>
      {block.children?.map((child) => (
        <Block block={child} key={child.id} />
      ))}
    </>
  );
};
