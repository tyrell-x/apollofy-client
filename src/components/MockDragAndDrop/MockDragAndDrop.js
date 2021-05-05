import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MockDragAndDrop.scss';

//This is the data of the column that we will apply dragAndDrop
const theOnes = [
  
  {
    id: 'Freddie',
    name: 'Freddie Mercury',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUyKOiHyn2XoADamerlyPienc4tZc_KEmP1sslg6R3jkxT8EJcxAwulFa39B624RTkJg0&usqp=CAU'
  },
  {
    id: 'DavidBowie',
    name: 'David Bowie',
    thumb: 'https://media.timeout.com/images/103021915/630/472/image.jpg'
  },
  {
    id: 'Madonna',
    name: 'Madonna',
    thumb: 'https://global-uploads.webflow.com/5ce40847c004883f9a3454ce/5f1f2f1a06e5836ba543bb30_c11b6b4dcb7f8d1f9ea49acf1b79b967.jpg'
  },
  {
    id: 'Elton John',
    name: 'Elton John',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlm28yZXWKRV_ucwHYsvju4K6FduJEVvnyLg&usqp=CAU'
  },
  {
    id: 'Lady Gaga',
    name: 'Lady Gaga',
    thumb: 'https://images.businessoffashion.com/site/uploads/2019/07/Lady-Gaga-Lead-Image-portrait.jpg?auto=format%2Ccompress&crop=top&fit=crop&h=741&w=494'
  }
]

function MockDragAndDrop() {
  const [singers, updateSingers] = useState(theOnes);
  console.log(theOnes)

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result)
    const items = Array.from(singers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(result.destination.index)
    updateSingers(items);
  }



  
  return (
    <div className="Singers">
      <header className="Singers-header">
        <h1>The Ones</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="singers">
            {(provided) => (
              <div className="singers" {...provided.droppableProps} ref={provided.innerRef}>
                {singers.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>q
                      {(provided) => (
                        <div className = "Singer-Card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="singers-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p className="artist-name">
                            { name }
                          </p>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}



export default MockDragAndDrop;
