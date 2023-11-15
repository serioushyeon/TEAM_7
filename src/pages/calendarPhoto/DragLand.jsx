import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragLand({ images, onDragEnd }) {
  useEffect(() => {
    // 필요한 초기화 작업 수행
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppablePhotos" direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {images.map((image, index) => (
              <Draggable
                key={image.name}
                draggableId={image.name}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // 추가 스타일링이 필요한 경우 여기에 작성
                  >
                    {/* 이미지 표시 */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragLand;
