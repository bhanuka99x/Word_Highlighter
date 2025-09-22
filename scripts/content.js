// Function to escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Highlight saved words
function highlightWords(words) {
  if (!words || words.length === 0) return;

  const walk = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = walk.nextNode())) {
    // Skip nodes inside script, style, textarea, input
    if (
      node.parentNode &&
      ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.parentNode.tagName)
    )
      continue;

    let replaced = node.nodeValue;
    words.forEach((word) => {
      const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, "gi");
      replaced = replaced.replace(
        regex,
        `<span style="background-color: yellow; color: black;">$&</span>`
      );
    });

    if (replaced !== node.nodeValue) {
      const span = document.createElement("span");
      span.innerHTML = replaced;
      node.parentNode.replaceChild(span, node);
    }
  }
}

// Get saved words and highlight
chrome.storage.local.get({ words: [] }, (data) => {
  highlightWords(data.words);
});
