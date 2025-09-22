function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightWords(words) {
  if (!words || words.length === 0) return;

  const regex = new RegExp(
    "\\b(" + words.map(escapeRegex).join("|") + ")\\b",
    "gi"
  );

  function walk(node) {
    // Skip these elements
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.tagName)
    ) {
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      if (regex.test(text)) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        text.replace(regex, (match, _p1, offset) => {
          if (offset > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.slice(lastIndex, offset))
            );
          }

          const highlight = document.createElement("span");
          highlight.textContent = match;
          highlight.style.backgroundColor = "yellow";
          highlight.style.color = "black";
          fragment.appendChild(highlight);

          lastIndex = offset + match.length;
        });

        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        node.parentNode.replaceChild(fragment, node);
      }
    } else {
      // Recurse through child nodes
      node.childNodes.forEach(walk);
    }
  }

  walk(document.body);
}

// Load words and run highlight
chrome.storage.local.get({ words: [] }, (data) => {
  highlightWords(data.words);
});
