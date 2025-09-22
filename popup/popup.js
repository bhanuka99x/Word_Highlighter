const input = document.getElementById("wordInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("wordList");



addBtn.addEventListener('click', () => {
    const word = input.value.trim();
    if (!word) return;
    chrome.storage.sync.get(['words'], (data) => {
        const words = data.words || [];
        if (!words.includes(word)) {
            words.push(word);
            chrome.storage.sync.set({ words }, () => {
                render(words);
                input.value = '';
            });
        }
    });
});

chrome.storage.sync.get(['words'], (data) => render(data.words || []));