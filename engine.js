function start() {
    let number = document.getElementById("number").value
    document.querySelectorAll(".disk").forEach(el => el.remove());
    let pillar = document.getElementById("pillar-left")
    for (let i = 0; i < number; i++) {
        let size = number - i;
        let disk = document.createElement("div")
        disk.id = "disk" + size;
        disk.classList.add("disk");
        disk.value = size
        disk.style.width = (size * 30) + 'px';
        disk.style.backgroundColor = '#' + generateRandomColor();
        disk.addEventListener('dragstart', function () {
            drag(event)
        }, false);
        pillar.appendChild(disk);
    }
    resetMoves()
    resetDraggable()
    setDraggable();
}

function generateRandomColor() {
    let randomColor = '';
    while (randomColor.length <= 5) {
        randomColor = Math.floor(Math.random() * 16777215).toString(16);
    }
    return randomColor;
}

function resetDraggable() {
    document.querySelectorAll(".disk").forEach(el => {
        el.draggable = false
    });
}

function setDraggable() {
    document.querySelectorAll(".pillar").forEach(el => {
        if (el.lastElementChild != null) {
            el.lastElementChild.draggable = true;
        }
    })
}

function increaseMoveCounter() {
    document.getElementById("moves").innerText++
}

function resetMoves() {
    document.getElementById("moves").innerText = '0';
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("value", ev.target.value);
}

function drop(ev, el) {
    ev.preventDefault();
    if (isValidMove(ev, el)) {
        increaseMoveCounter();
        let data = ev.dataTransfer.getData("text");
        el.appendChild(document.getElementById(data));
    }
    resetDraggable();
    if (!isFinished()) {
        setDraggable();
    }
}

function isValidMove(ev, el) {
    let value = ev.dataTransfer.getData("value")
    if (el.lastElementChild == null) {
        return true;
    }
    let topVal = el.lastElementChild.value;
    return value < topVal;
}

function isFinished() {
    let targetCount = '' + document.getElementById("number").value;
    let count = '' + document.getElementById("pillar-right").childElementCount;
    if (targetCount === count) {
        setTimeout(function () {
            alert("Well done!!")
        }, 100)
        return true;
    }
    return false;
}