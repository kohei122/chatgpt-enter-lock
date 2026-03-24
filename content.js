(() => {
  "use strict";

  function handleShiftEnterMode(event) {
    const isEnter =
      (event.code === "Enter" || event.code === "NumpadEnter") &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey;

    const isShiftEnter =
      (event.code === "Enter" || event.code === "NumpadEnter") &&
      event.shiftKey &&
      !event.ctrlKey &&
      !event.metaKey;

    const isPromptTextarea = event.target && event.target.id === "prompt-textarea";

    if (!event.isTrusted) return;
    if (!isPromptTextarea) return;

    // Enter only -> simulate Shift+Enter for newline
    if (isEnter) {
      event.preventDefault();

      const newEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true
      });

      event.target.dispatchEvent(newEvent);
      return;
    }

    // Shift+Enter -> simulate Meta+Enter for submit
    if (isShiftEnter) {
      event.preventDefault();

      const newEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true,
        ctrlKey: false,
        metaKey: true,
        shiftKey: false
      });

      event.target.dispatchEvent(newEvent);
    }
  }

  document.addEventListener("keydown", handleShiftEnterMode, true);
})();