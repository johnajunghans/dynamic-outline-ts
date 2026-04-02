import { useEffect, useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { AddIcon } from '@chakra-ui/icons'
import { insertObjectById, removeObjectById, reorderObjectById, updateObjectDescriptionById } from './recursiveFunctions'
import { Image } from '@chakra-ui/react';
import { Block } from './types'
import NewBlock from './components/NewBlock'
import SideDrawer from './components/SideDrawer'
import User from './assets/user.svg'
import Logo from './assets/Logo.png'

function App() {

  function idGen(): number {
    return Math.round(Math.random()*100000000)
  }

  const [outline, setOutline] = useState<Block[] | null>(null);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("outline") ?? 'null') as Block[] | null;
    setOutline(data)
  }, [])

  const handleDropEnd = (results: DropResult) => {
    const { source, destination, draggableId } = results;
    if (!destination) return;
    
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const sourceId = draggableId;
    const destinationId = destination.droppableId;
    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    const outlineCopy = [...(outline ?? [])];
    const updatedOutline = reorderObjectById(outlineCopy, sourceId, sourceIndex, destinationId, destinationIndex);
    if (updatedOutline) {
      window.localStorage.setItem("outline", JSON.stringify(updatedOutline));
      setOutline(updatedOutline);
    }
  }

  const handleAddBlockAtRootLevel = () => {
    const newOutline = outline ? [...outline] : [];
    const newBlock: Block = {
      id: idGen(),
      description: "",
      children: []
    }
    newOutline.push(newBlock);
    window.localStorage.setItem("outline", JSON.stringify(newOutline));
    setOutline(newOutline);
  }

  const handleAddChildBlock = (id: number) => {
    const newOutline = [...(outline ?? [])];
    const newBlock: Block = {
      id: idGen(),
      description: "",
      children: []
    }
    const array = insertObjectById(newOutline, id, newBlock);
    if (array) {
      window.localStorage.setItem("outline", JSON.stringify(array));
      setOutline(array);
    }
  }

  const handleDeleteBlock = (id: number) => {
    const outlineCopy = [...(outline ?? [])];
    const newOutline = removeObjectById(outlineCopy, id);
    if (newOutline) {
      window.localStorage.setItem("outline", JSON.stringify(newOutline));
      setOutline(newOutline);
    }
  }

  const handleUpdateDescription = (id: number, newText: string) => {
    const outlineCopy = [...(outline ?? [])];
    const newOutline = updateObjectDescriptionById(outlineCopy, id, newText);
    if (newOutline) {
      window.localStorage.setItem("outline", JSON.stringify(newOutline));
      setOutline(newOutline);
    }
  }

  return (
    <main>
      <header>
        <SideDrawer />
        <Image src={Logo}  />
        <Image src={User}
          boxSize="50px"
          p="11px"
          mr="1rem" 
          boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
          borderRadius="50%"
          bgColor="#F8F8FF"
          _hover={{bgColor: "rgba(0,0,0,0.10)"}}
          transition="0.2s"
          cursor="pointer"
        />
      </header>
      <section>
        <DragDropContext onDragEnd={handleDropEnd}>
          <Droppable droppableId='ROOT'>
            {(provided, snapshot) => (
              <div id='root-container'
                style={{backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,0.2)" : "unset"}}
                {...provided.droppableProps} 
                ref={provided.innerRef}>
              {outline && outline.map((block, index) => (
                <NewBlock 
                  key={block.id}
                  index={index}
                  id={block.id}
                  bgColor={true}
                  childElements={block.children}
                  description={block.description}
                  addChild={handleAddChildBlock}
                  deleteBlock={handleDeleteBlock}
                  updateDescription={handleUpdateDescription}
                />
              ))}
              {provided.placeholder}
              <AddIcon as='button' onClick={handleAddBlockAtRootLevel}
                boxSize="40px"
                p="12px"
                bgColor="#F8F8FF"
                boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                _hover={{bgColor: "rgba(0,0,0,0.10)"}}
                borderRadius="50%"
                cursor="pointer"
                transition="0.2s"
              />
              
            </div>
            )} 
          </Droppable>
        </DragDropContext>
      </section>
    </main>
  )
}

export default App
