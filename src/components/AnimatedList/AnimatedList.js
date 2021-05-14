import { Flipper } from "react-flip-toolkit";

function AnimatedList({ children, ...props }) {
  const handleEnterUpdateDelete = async ({
    hideEnteringElements,
    animateEnteringElements,
    animateExitingElements,
    animateFlippedElements,
  }) => {
    hideEnteringElements();
    animateExitingElements();
    animateFlippedElements();
    animateEnteringElements();
  };

  return (
    <Flipper handleEnterUpdateDelete={handleEnterUpdateDelete} {...props}>
      <div className="list">{children}</div>
    </Flipper>
  );
}

export default AnimatedList;
