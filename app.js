const checkboxes = document.querySelectorAll(".check");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

const STORAGE_KEY = "launch-checklist-state";

// load saved state
function loadState() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;

    checkboxes.forEach((cb, i) => {
        cb.checked = saved[i] || false;
    });
}

// save state
function saveState() {
    const state = [];
    checkboxes.forEach(cb => state.push(cb.checked));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// update progress
function updateProgress() {

    let total = checkboxes.length;
    let checked = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) checked++;
    });

    let percent = Math.round((checked / total) * 100);

    progress.style.width = percent + "%";
    progressText.textContent = `${percent}% Completed`;

    if (percent === 100) {
        progressText.textContent = "🎉 Website Ready to Launch!";
    }

    saveState();
}

// attach events
checkboxes.forEach(cb => {
    cb.addEventListener("change", updateProgress);
});

// PRINT FUNCTION
function printChecklist() {
    window.print();
}

// SIMPLE DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// INIT
loadState();
updateProgress();