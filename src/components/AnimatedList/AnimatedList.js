import { Flipper } from "react-flip-toolkit";

function AnimatedList({ children, ...props }) {
  return (
    <Flipper {...props}>
      <div className="list">{children}</div>
    </Flipper>
  );
}

export default AnimatedList;
