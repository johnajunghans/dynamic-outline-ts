import { Droppable, Draggable } from "react-beautiful-dnd";
import { Block as BlockType } from "../types";

interface BlockProps {
  subBlock: BlockType[];
  preview: string;
  id: number;
  index: number;
}

const Block = ({ subBlock, preview, id, index }: BlockProps) => {

    return (
        <Droppable droppableId={`container-${id.toString()}`}>
            {(provided) => (
                <div className="block-container" 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                >
                <Draggable draggableId={`block-${id.toString()}`} index={index}>
                    {(provided) => (
                        <div className="block"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            id={`block-${id.toString()}`}
                            draggable="true" 
                        > {preview}
                        </div>
                    )} 
                </Draggable>
                <div className="block-children">
                    {subBlock.map((block, index) => (
                        <Block
                            key={block.id}
                            index={index}
                            id={block.id}
                            subBlock={block.children}
                            preview={`${block.description.slice(0,50)}...`}
                        ></Block>
                    ))}
                </div>
                {provided.placeholder}
            </div>
            )}
        </Droppable> 
     );
}
 
export default Block;
