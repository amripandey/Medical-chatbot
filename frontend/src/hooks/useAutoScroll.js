import { useEffect } from "react";

function useScrollToBottomOnMutation(scrollRef, isEnabled = true) {
  useEffect(() => {
    if (!scrollRef?.current || !isEnabled) return;

    const observer = new MutationObserver(() => {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    });

    const target = scrollRef.current.parentNode; // Monitor the parent node for changes
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect(); // Clean up observer
    };
  }, [scrollRef, isEnabled]);
}

export default useScrollToBottomOnMutation;
