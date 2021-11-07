let running;

function startAutoSolve() {
    document.getElementById("solve").disabled = true;
    disableDragging();

    let a = document.getElementById("pillar-left");
    let b = document.getElementById("pillar-middle");
    let c = document.getElementById("pillar-right");

    function moveDisk() {
        c.appendChild(a.lastElementChild);
        increaseMoveCounter();
    }

    function swapAB() {
        let tmp = a;
        a = b;
        b = tmp;
    }

    function swapBC() {
        let tmp = b;
        b = c;
        c = tmp;
    }

    function resolveX(seq, level) {
        if (level < 1) return;
        seq.push(swapBC);
        resolveX(seq, level - 1);
        seq.push(swapBC);
        seq.push(moveDisk);
        seq.push(swapAB);
        resolveX(seq, level - 1);
        seq.push(swapAB);
    }

    let difficulty = document.getElementById("number").value
    let sequence = []
    resolveX(sequence, difficulty);
    startResolveAnimation(sequence, 100 / difficulty);
}

function stopAutoSolve() {
    document.getElementById("solve").disabled = false;
    clearInterval(running);
}

function startResolveAnimation(sequence, speed) {
    let counter = 0;
    function doNext() {
        if (counter >= sequence.length) {
            clearInterval(running);
        } else {
            sequence[counter]();
            counter++;
        }
    }

    running = setInterval(doNext, speed);
}