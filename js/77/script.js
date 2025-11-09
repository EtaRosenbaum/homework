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
    const musicDiv = document.querySelector('#music');
    const musicTitle = document.querySelector('#trackName');






    musicDiv.addEventListener('change', () => {
        const trackName = musicDiv.options[musicDiv.selectedIndex].text;
        musicTitle.textContent = trackName;

        let player = document.getElementById('player');
        if (!player) {
            player = document.createElement('audio');
            player.id = 'player';
            player.style.display = 'none';
            document.body.appendChild(player);
        }

        player.src = musicDiv.value;
        player.play();
    });



    let currentBg = '';
    let currentDrawingIndex = null;
    let dragging = null;
    let offset = { x: 0, y: 0 };
    let moved = false;
    const fallbackBg = 'Images/backgroundjpg.jpeg';

    let originalParent = null;
    let originalIndex = null;

    const getDrawings = () => JSON.parse(localStorage.getItem('drawings')) || [];
    const saveDrawings = (arr) => localStorage.setItem('drawings', JSON.stringify(arr));

    const showMessage = (text) => {
        message.textContent = text;
        message.style.display = "block";
        setTimeout(() => message.style.display = "none", 2000);
    };

    const setBackground = (src) => {
            currentBg = src || fallbackBg;
            document.body.style.backgroundImage = `url("${currentBg}")`;
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';

    };

    const resetPartsToSidebar = () => {
        document.querySelectorAll('.part.in-game').forEach(p => {
            p.classList.remove('in-game');
            p.dataset.original = 'true';
            Object.assign(p.style, { position: '', left: '', top: '', zIndex: '' });
            partsSection.appendChild(p);
        });
    };

    const getParts = () =>
        Array.from(document.querySelectorAll('.part.in-game')).map(p => ({
            src: p.src,
            x: parseFloat(p.style.left) || 0,
            y: parseFloat(p.style.top) || 0,
            width: p.offsetWidth,
            height: p.offsetHeight
        }));

    const updateLoadDropdown = () => {
        const drawings = getDrawings();
        loadSelect.innerHTML = `<option value="" disabled selected>Load a drawing</option>`;
        drawings.forEach((d, i) => {
            loadSelect.innerHTML += `<option value="${i}">${d.name}</option>`;
        });
        if (currentDrawingIndex !== null) loadSelect.value = currentDrawingIndex;
    };

    const updateCurrentProjectLabel = () => {
        const label = document.querySelector('#currentProjectLabel');
        const drawings = getDrawings();
        label.textContent = currentDrawingIndex === null
            ? 'Current Project: (none)'
            : `Current Project: ${drawings[currentDrawingIndex]?.name || '(unknown)'}`;
    };

    const saveCurrentDrawing = (showMsg = true) => {
        if (currentDrawingIndex === null) return;
        const drawings = getDrawings();
        drawings[currentDrawingIndex] = {
            ...drawings[currentDrawingIndex],
            background: currentBg || fallbackBg,
            parts: getParts()
        };
        saveDrawings(drawings);
        if (showMsg) showMessage("Drawing saved!");
        updateLoadDropdown();
    };

    const autosave = () => {
        if (currentDrawingIndex !== null) saveCurrentDrawing(false);
    };

    const loadDrawing = (index) => {
        const drawings = getDrawings();
        const drawing = drawings[index];
        if (!drawing) return;

        currentDrawingIndex = index;
        setBackground(drawing.background);
        resetPartsToSidebar();

        drawing.parts.forEach(p => {
            const img = Array.from(document.querySelectorAll('.part')).find(x => x.src === p.src);
            if (img) {
                img.dataset.original = 'false';
                img.classList.add('in-game');
                Object.assign(img.style, {
                    position: 'absolute',
                    left: p.x + 'px',
                    top: p.y + 'px',
                    width: p.width + 'px',
                    height: p.height + 'px'
                });
                gamearea.appendChild(img);
            }
        });

        updateCurrentProjectLabel();
    };

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        toggleBtn.textContent = sidebar.classList.contains('open') ? 'X' : 'Customize';
    });

    bgOptions.forEach(bg => bg.addEventListener('click', () => setBackground(bg.src)));

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

    resetBtn.addEventListener("click", () => {
        resetPartsToSidebar();
        setBackground(fallbackBg);
        currentDrawingIndex = null;
        nameInput.style.display = "inline-block";
confirmBtn.style.display = "inline-block";
        updateCurrentProjectLabel();
        updateLoadDropdown();
    });

    confirmBtn.addEventListener("click", () => {
        const name = nameInput.value.trim() || "Untitled";
        const drawings = getDrawings();
        drawings.push({
            name,
            background: currentBg || fallbackBg,
            parts: getParts()
        });
        saveDrawings(drawings);
        currentDrawingIndex = drawings.length - 1;
        nameInput.value = "";
        nameInput.style.display = "none";
        confirmBtn.style.display = "none";
        updateLoadDropdown();
        updateCurrentProjectLabel();
        showMessage("Drawing saved!");
    });

    nameInput.addEventListener("keypress", e => {
        if (e.key === "Enter") confirmBtn.click();
    });

    loadSelect.addEventListener("change", () => {
        const index = parseInt(loadSelect.value);
        if (!isNaN(index)) loadDrawing(index);
    });

    document.querySelectorAll('.part').forEach(p => p.dataset.original = 'true');
    updateLoadDropdown();
}());