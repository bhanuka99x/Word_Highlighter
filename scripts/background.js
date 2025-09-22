chrome.runtime.onInstalled.addListener(() => {
  // Create right-click context menu
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Add word to Highlighter",
    contexts: ["selection"], // show only when user selects text
  });
});

// Listen for clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWord" && info.selectionText) {
    const word = info.selectionText.trim();
    //save word into local storage
    chrome.storage.local.get(
      {
        words: [],
      },
      (data) => {
        const words = data.words;

        if (!words.include(word)) {
          words.push(word);

          chrome.storage.local.set({ words }, () => {
            console.log(`saveword:${word}`);
          });
        }
      }
    );
  }
});
