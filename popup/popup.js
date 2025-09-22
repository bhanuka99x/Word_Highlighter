const clearBtn = document.getElementById("clearBtn");
const wordList = document.getElementById("wordList");

// Render saved words
function renderWords() {
  chrome.storage.local.get({ words: [] }, (data) => {
    wordList.innerHTML = "";
    data.words.forEach((word) => {
      const li = document.createElement("li");
      li.textContent = word;
      wordList.appendChild(li);
    });
  });
}

// Clear all words
clearBtn.addEventListener("click", () => {
  chrome.storage.local.set({ words: [] }, () => {
    renderWords();
  });
});


document.addEventListener("DOMContentLoaded", renderWords);
