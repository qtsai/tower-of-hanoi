function solve() {
    let left = document.getElementById("pillar-left");
    let middle = document.getElementById("pillar-middle");
    let right = document.getElementById("pillar-right");

    let l2m = function () {
        middle.appendChild(left.lastElementChild);
    }
    let l2r = function () {
        right.appendChild(left.lastElementChild);
    }
    let m2l = function () {
        left.appendChild(middle.lastElementChild);
    }
    let m2r = function () {
        right.appendChild(middle.lastElementChild);
    }
    let r2l = function () {
        left.appendChild(right.lastElementChild);
    }
    let r2m = function () {
        middle.appendChild(right.lastElementChild);
    }

    let speed = 500;
    let running;
    let sequence = [
        l2r,
        l2m,
        r2m,
        l2r,
        m2l,
        m2r,
        l2r
    ];

    let counter = 0;

    function doNext() {
        if (counter >= sequence.length) {
            clearInterval(running);
        } else {
            sequence[counter]();
            counter++;
        }
    }

    running = setInterval(doNext, speed)

}