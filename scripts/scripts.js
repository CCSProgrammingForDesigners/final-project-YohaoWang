var data = {
    canvas: null,
    ctx: null,
    clickedDot: null,
    dots: [{
        x: 190,
        y: 40,
        order: 0,
    }, {
        x: 210,
        y: 40,
        order: 1

    }, {
        x: 200,
        y: 50,
    }, {
        x: 180,
        y: 70,
    }, {
        x: 220,
        y: 60,
    }, {
        x: 230,
        y: 90,
    }, {
        x: 200,
        y: 90,
    }, {
        x: 210,
        y: 140,
    }, {
        x: 200,
        y: 190,
    }, {
        x: 210,
        y: 230,
    }, {
        x: 210,
        y: 300,
    }, {
        x: 200,
        y: 280,
    }, {
        x: 220,
        y: 240,
    }, {
        x: 240,
        y: 210,
    }, {
        x: 260,
        y: 240,
    }, {
        x: 280,
        y: 260,
    }, {
        x: 270,
        y: 230,
    }, {
        x: 270,
        y: 190,
    }, {
        x: 300,
        y: 180,
    }, {
        x: 330,
        y: 190,
    }, {
        x: 340,
        y: 230,
    }, {
        x: 330,
        y: 250,
    }, {
        x: 340,
        y: 260,
    }, {
        x: 240,
        y: 200,
    }, {
        x: 260,
        y: 200,
    }, {
        x: 240,
        y: 160,
    }, {
        x: 270,
        y: 180,
    }, {
        x: 280,
        y: 140,
    }, {
        x: 290,
        y: 170,
    }, {
        x: 330,
        y: 150,
    }, {
        x: 310,
        y: 170,
    }, {
        x: 360,
        y: 170,
    }, {
        x: 340,
        y: 180,
    }]
};

function circleCollision(c1, c2) {
    var a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;

    if (a > Math.sqrt((x * x) + (y * y))) return true;
    else return false;
}

function prepCanvas() {
    var res = window.devicePixelRatio || 1,
        scale = 1 / res;
    data.canvas = document.getElementById('dots');
    data.ctx = data.canvas.getContext('2d');

    data.canvas.width = window.innerWidth * res;
    data.canvas.height = window.innerHeight * res;
    data.canvas.style.width = window.innerWidth + 'px';
    data.canvas.style.height = window.innerHeight + 'px';

    data.ctx.scale(res, res);

    data.canvas.addEventListener('mousedown', function (e) {
        checkForDot(e);
    });
}

function drawDots() {
    var i = 0;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i];
        data.ctx.beginPath();
        data.ctx.arc(d.x, d.y, 2, 0, 2 * Math.PI);
        data.ctx.fillStyle = '#777';
        data.ctx.fill();
        data.ctx.closePath();
    }
}

function drawLine(toDot) {
    data.ctx.beginPath();
    data.ctx.moveTo(data.clickedDot.x, data.clickedDot.y);
    data.ctx.lineTo(toDot.x, toDot.y);
    data.ctx.lineWidth = 1;
    data.ctx.strokeStyle = '#777';
    data.ctx.stroke();
    data.ctx.closePath();
}

function checkForDot(e) {
    var i = 0,
        col = null;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i],
            c1 = {
                x: d.x,
                y: d.y,
                r: 10
            },
            c2 = {
                x: e.pageX,
                y: e.pageY,
                r: 10
            };
        if (circleCollision(c1, c2)) col = d;
    }
    if (col !== null) {
        if (data.clickedDot !== null) drawLine(col);
        data.clickedDot = col;
        console.log(col)
    } else data.clickedDot = null;
}

prepCanvas();
drawDots();