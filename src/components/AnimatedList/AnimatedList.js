import { Flipper } from "react-flip-toolkit";
import { Droppable, Draggable } from "react-beautiful-dnd"

function AnimatedList({ children, ...props }) {
  return (
    <Flipper {...props}>

      <div >{children}</div>

    </Flipper>
  );
}

export default AnimatedList;
