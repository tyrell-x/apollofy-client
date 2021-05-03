import { Flipped } from "react-flip-toolkit";
import anime from "animejs";

function AnimatedListItem({ children, ...props }) {
  const onAppear = (el, index) => {
    const { top } = el.getBoundingClientRect();
    anime({
      begin: () => {
        el.style.opacity = null;
      },
      targets: el,
      translateY: 60,
      direction: "reverse",
      duration: 300,
      easing: "easeInSine",
      endDelay: 75 * index,
    });
  };

  const onExit = (el, index, removeElement) => {
    anime({
      targets: el,
      translateY: 60,
      opacity: 0,
      duration: 300,
      easing: "easeInSine",
      delay: 75 * index,
      complete: removeElement,
    });
    return removeElement;
  };

  return (
    <Flipped {...props} onAppear={onAppear} onExit={onExit}>
      {children}
    </Flipped>
  );
}

export default AnimatedListItem;
