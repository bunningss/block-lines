import { useBlocks } from "../hooks/use-blocks";
import { Block } from "./block";

export function Canvas() {
  const rootBlock = useBlocks((state) => state.rootBlock);

  return <Block block={rootBlock} />;
}
