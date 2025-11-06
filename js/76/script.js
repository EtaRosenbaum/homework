(function () {
    'use strict';

    const toggleBtn = document.querySelector('#toggleParts');
    const sidebar = document.querySelector('#parts-sidebar');
    const bgOptions = document.querySelectorAll('.bg-option');
    const gamearea = document.querySelector('.game-area');
    const loadSelect = document.querySelector("#loadDrawingSelect");
    const resetBtn = document.querySelector("#resetBtn");
    const partsSection = document.querySelector('#parts-section');
    const nameInput = document.querySelector("#drawingNameInput");
    const confirmBtn = document.querySelector("#confirmSaveNameBtn");
    const message = document.querySelector("#message");

    let currentBg = '';
    let currentDrawingIndex = null;

    let dragging = null;
    let offset = { x: 0, y: 0 };
    let originalParent = null;
    let originalIndex = null;
    let moved = false;

    const fallbackBg = 'Images/backgroundjpg.jpeg';

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        toggleBtn.textContent = sidebar.classList.contains('open') ? 'X' : 'Customize';
    });

    bgOptions.forEach(bg => {
        bg.addEventListener('click', () => {
            currentBg = bg.src || fallbackBg;
            document.body.style.backgroundImage = `url(${currentBg})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        });
    });

    document.querySelectorAll('.part').forEach(part => {
        part.dataset.original = 'true';
    });

    document.addEventListener('mousedown', e => {
        if (!e.target.classList.contains('part')) return;

        e.preventDefault();
        dragging = e.target;

        const rect = dragging.getBoundingClientRect();
        offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        originalParent = dragging.parentNode;
        originalIndex = Array.from(originalParent.children).indexOf(dragging);
        moved = false;
    });

    document.addEventListener('mousemove', e => {
        if (!dragging) return;

        if (!moved) {
            if (dragging.dataset.original === 'true') {
                dragging.dataset.original = 'false';
                dragging.classList.add('in-game');
            }
            dragging.style.position = 'absolute';
            dragging.style.zIndex = 1000;
            gamearea.appendChild(dragging);
            moved = true;
        }

        const gameRect = gamearea.getBoundingClientRect();
        dragging.style.left = `${e.clientX - gameRect.left - offset.x}px`;
        dragging.style.top = `${e.clientY - gameRect.top - offset.y}px`;
    });

    document.addEventListener('mouseup', e => {
        if (!dragging) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const imgRect = dragging.getBoundingClientRect();
        const partsRect = partsSection.getBoundingClientRect();

        const droppedOffScreen =
            imgRect.right < 0 || imgRect.left > vw || imgRect.bottom < 0 || imgRect.top > vh;

        const droppedInPartsSection =
            e.clientX >= partsRect.left &&
            e.clientX <= partsRect.right &&
            e.clientY >= partsRect.top &&
            e.clientY <= partsRect.bottom;

        if (droppedOffScreen || droppedInPartsSection) {
            dragging.dataset.original = 'true';
            dragging.classList.remove('in-game');
            dragging.style.position = 'relative';
            dragging.style.left = '';
            dragging.style.top = '';
            dragging.style.zIndex = '';

            const parts = Array.from(partsSection.children);
            if (originalIndex < parts.length) {
                partsSection.insertBefore(dragging, parts[originalIndex]);
            } else {
                partsSection.appendChild(dragging);
            }
        } else {
            dragging.classList.add('in-game');
        }

        dragging = null;
        moved = false;
        autosave();
    });

    function getParts() {
        return Array.from(document.querySelectorAll('.part.in-game')).map(part => ({
            src: part.src,
            x: parseFloat(part.style.left),
            y: parseFloat(part.style.top),
            width: part.offsetWidth,
            height: part.offsetHeight
        }));
    }

    function saveCurrentDrawing(showMsg = true) {
        if (currentDrawingIndex === null) return;
        let drawings = JSON.parse(localStorage.getItem('drawings')) || [];
        drawings[currentDrawingIndex] = {
            ...drawings[currentDrawingIndex],
            background: currentBg || fallbackBg,
            parts: getParts()
        };
        localStorage.setItem('drawings', JSON.stringify(drawings));
        if (showMsg) showMessage("Drawing saved!");
        updateLoadDropdown();
    }

    function loadDrawing(index) {
        const drawings = JSON.parse(localStorage.getItem('drawings')) || [];
        const drawing = drawings[index];
        if (!drawing) return;

        currentDrawingIndex = index;
        currentBg = drawing.background || fallbackBg;
        document.body.style.backgroundImage = `url(${currentBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        document.querySelectorAll('.part.in-game').forEach(p => {
            p.classList.remove('in-game');
            p.dataset.original = 'true';
            p.style.position = 'relative';
            p.style.left = '';
            p.style.top = '';
            p.style.zIndex = '';
            partsSection.appendChild(p);
        });

        drawing.parts.forEach(p => {
            const img = Array.from(document.querySelectorAll('.part')).find(x => x.src === p.src);
            if (img) {
                img.dataset.original = 'false';
                img.classList.add('in-game');
                img.style.position = 'absolute';
                img.style.left = p.x + 'px';
                img.style.top = p.y + 'px';
                img.style.width = p.width + 'px';
                img.style.height = p.height + 'px';
                gamearea.appendChild(img);
            }
        });

        updateCurrentProjectLabel();
    }

    function updateLoadDropdown() {
        const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
        loadSelect.innerHTML = '';

        const placeholder = document.createElement("option");
        placeholder.value = '';
        placeholder.textContent = 'Load a drawing';
        placeholder.disabled = true;
        placeholder.selected = true;
        loadSelect.appendChild(placeholder);

        drawings.forEach((d, i) => {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = d.name;
            loadSelect.appendChild(option);
        });

        if (currentDrawingIndex !== null) {
            loadSelect.value = currentDrawingIndex;
        }
    }

    function updateCurrentProjectLabel() {
        const drawings = JSON.parse(localStorage.getItem('drawings')) || [];
        const label = document.querySelector('#currentProjectLabel');
        if (currentDrawingIndex === null) {
            label.textContent = 'Current Project: (none)';
        } else if (drawings[currentDrawingIndex]) {
            label.textContent = `Current Project: ${drawings[currentDrawingIndex].name}`;
        } else {
            label.textContent = 'Current Project: (unknown)';
        }
    }

    function autosave() {
        if (currentDrawingIndex === null) return;
        saveCurrentDrawing(false);
    }

    resetBtn.addEventListener("click", () => {
        document.querySelectorAll('.part.in-game').forEach(p => {
            p.classList.remove('in-game');
            p.dataset.original = 'true';
            p.style.position = 'relative';
            p.style.left = '';
            p.style.top = '';
            p.style.zIndex = '';
            partsSection.appendChild(p);
        });
        document.body.style.backgroundImage = `url(${fallbackBg})`;
        currentBg = '';
        currentDrawingIndex = null;

        nameInput.style.display = "inline-block";
        confirmBtn.style.display = "inline-block";

        updateCurrentProjectLabel();
        updateLoadDropdown();
    });

    confirmBtn.addEventListener("click", () => {
        const name = nameInput.value.trim() || "Untitled";

        let drawings = JSON.parse(localStorage.getItem('drawings')) || [];
        drawings.push({
            name: name,
            background: currentBg || fallbackBg,
            parts: getParts()
        });
        localStorage.setItem('drawings', JSON.stringify(drawings));

        currentDrawingIndex = drawings.length - 1;

        nameInput.value = "";
        nameInput.style.display = "none";
        confirmBtn.style.display = "none";

        updateLoadDropdown();
        updateCurrentProjectLabel();
        showMessage("Drawing saved!");
    });

    nameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") confirmBtn.click();
    });

    loadSelect.addEventListener("change", () => {
        const index = parseInt(loadSelect.value);
        if (!isNaN(index)) loadDrawing(index);
    });

    function showMessage(text) {
        message.textContent = text;
        message.style.display = "block";
        setTimeout(() => message.style.display = "none", 2000);
    }

    updateLoadDropdown();
}());