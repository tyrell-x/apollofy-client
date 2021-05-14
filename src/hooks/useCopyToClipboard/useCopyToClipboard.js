import React from "react";
import copy from "copy-to-clipboard";

<<<<<<< HEAD

=======
>>>>>>> 0e446d181b1103c6110ec8197ceb08c446c52515
export const useCopyToClipboard = function (resetInterval = null) {
  const [isCopied, setCopied] = React.useState(false);

  function handleCopy(text) {
    if (typeof text === "string" || typeof text == "number") {
      copy(text.toString());
      setCopied(true);
      alert("Playlist link succesfully copied to clipboard")
    } else {
      setCopied(false);
      console.error(
        `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`,
      );
    }
  }

  return [isCopied, handleCopy];
};
