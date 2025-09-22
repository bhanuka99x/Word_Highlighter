chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Add word to Highlighter",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWord" && info.selectionText) {
    const word = info.selectionText.trim();
    chrome.storage.local.get({ words: [] }, (data) => {
      const words = data.words;
      if (!words.includes(word)) {
        words.push(word);
        chrome.storage.local.set({ words }, () => {
          console.log(`Saved word: ${word}`);
        });
      }
    });
  }
});
