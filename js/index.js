var canvas = new fabric.Canvas('gameCanvas');
var score = 0;
var gameEnded = false;
var lastMousePosition = { x: 0, y: 0 }; // 记录鼠标的最后位置

// 普通地鼠的参数
var moleDuration = 10000; // 地鼠在画布上的时间（毫秒）
var moleMoveSpeed = 20; // 地鼠移动速度（值越小，移动越快）

// 特殊地鼠的参数
var minSpecialMoleTime = 10000; // 最短生成时间（毫秒）
var maxSpecialMoleTime = 40000; // 最长生成时间（毫秒）
var specialChaseSpeed = 5; // 特殊地鼠的追逐速度

var generateDitianMoleInterval;


var moleImages = ['images/long.png', 'images/jigong.png', 'images/liandao.png', 'images/dk.png'];
var hitImage = 'images/shang.png';
var moleDuration = 10000; // 地鼠在画布上的时间（毫秒）

// 创建普通地鼠的函数
function createMole() {
    function createMole() {
        var randomImage = moleImages[Math.floor(Math.random() * moleImages.length)];
        fabric.Image.fromURL(randomImage, function(img) {
            img.scale(0.5).set({
                left: Math.random() * canvas.getWidth(),
                top: Math.random() * canvas.getHeight(),
                selectable: false
            });
    
            img.hasControls = img.hasBorders = false;
    
            img.on('mousedown', function() {
                score++;
                document.getElementById('score').textContent = score;
                replaceWithHitImage(img);
                clearTimeout(img.movementTimeout); 
            });
    
            canvas.add(img);
            moveMole(img);
        });
    }
    
    function moveMole(mole) {
        var duration = moleDuration / 80;
        var moveMoleInterval = setInterval(function() {
            mole.set({
                left: mole.left + (Math.random() - 0.5) * 20,
                top: mole.top + (Math.random() - 0.5) * 20
            });
            mole.setCoords();
            canvas.renderAll();
        }, duration);
    
        mole.movementTimeout = setTimeout(function() {
            clearInterval(moveMoleInterval); 
            canvas.remove(mole); 
        }, moleDuration);
    }

    function replaceWithHitImage(mole) {
        fabric.Image.fromURL(hitImage, function(hitImg) {
            hitImg.set({
                left: mole.left,
                top: mole.top,
                scaleX: mole.scaleX,
                scaleY: mole.scaleY,
                selectable: false
            });
            canvas.remove(mole);
            canvas.add(hitImg);
            setTimeout(function() { canvas.remove(hitImg); }, 1000);
        });
    }
    
    function showMole() {
        createMole();
    }
    
    setInterval(showMole, 2000);


}

// 创建特殊地鼠的函数
function createSpecialMole() {
function createSpecialMole() {
    fabric.Image.fromURL('images/wushi.png', function(img) {
        specialMole = img;
        specialMole.scale(0.5).set({
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
            selectable: false
        });

        specialMole.hasControls = specialMole.hasBorders = false;

        // 特殊地鼠的点击事件
        specialMole.on('mousedown', function() {
            gameEnded = true;
            canvas.clear();
            alert("游戏结束！你的分数是: " + score);
            // 可以在这里添加其他游戏结束逻辑
        });

        canvas.add(specialMole);
        chaseMouse();

        // 设置定时器在15秒后移除特殊地鼠
        setTimeout(function() {
            if (specialMole && !gameEnded) {
                canvas.remove(specialMole);
                specialMole = null; // 清除特殊地鼠引用
            }
        }, specialMoleDuration);
    });
}


}

// 随机时间生成特殊地鼠
function randomSpecialMole() {
    var randomTime = Math.random() * (maxSpecialMoleTime - minSpecialMoleTime) + minSpecialMoleTime;
    setTimeout(function() {
        createSpecialMole();
        randomSpecialMole(); // 递归调用以继续生成特殊地鼠
    }, randomTime);
}

// 创建地雷地鼠的函数
function createMineMole() {
    // 地雷地鼠的创建逻辑，类似于普通地鼠
    // 点击地雷地鼠会结束游戏
}

// 游戏结束函数
function endGame() {
    gameEnded = true;
    canvas.clear();
    showGameOverScreen();
    // 其他结束游戏的逻辑
}

// 初始化游戏的函数
function initGame() {
    score = 0;
    gameEnded = false;
    document.getElementById('score').textContent = score;
    document.getElementById('gameOverScreen').style.display = 'none';
    canvas.clear();

    randomSpecialMole(); // 开始随机生成特殊地鼠
    // 定时生成普通地鼠和地雷地鼠...
}

// 为开始游戏和重开游戏按钮添加事件监听器
document.getElementById('startGameButton').addEventListener('click', initGame);
document.getElementById('restartGameButton').addEventListener('click', initGame);

// 特殊地鼠追逐鼠标的函数
function chaseMouse() {
    canvas.on('mouse:move', function(event) {
        if (gameEnded) return;
        lastMousePosition = canvas.getPointer(event.e);
    });

    setInterval(function() {
        if (!specialMole || gameEnded) return;
        // 计算特殊地鼠与最后鼠标位置的差距
        var deltaX = lastMousePosition.x - specialMole.left;
        var deltaY = lastMousePosition.y - specialMole.top;

        // 更新特殊地鼠的位置
        specialMole.set({
            left: specialMole.left + deltaX / chaseSpeed,
            top: specialMole.top + deltaY / chaseSpeed
        });
        specialMole.setCoords();
        canvas.renderAll();
    }, 50); // 更新频率，可以根据需要调整
}

// 显示游戏结束画面的函数
function showGameOverScreen() {
    canvas.clear();
    document.getElementById('gameOverScreen').style.display = 'block';
}

// 初始化游戏
initGame();
