function generateDiTianDiMole() {
  fabric.Image.fromURL('./images/ditian.png', function(img) {
    var diTianDiMole = img;
    diTianDiMole.scaleToWidth(40);
    diTianDiMole.scaleToHeight(40);
    diTianDiMole.set({
        left: Math.random() * canvas.getWidth(),
        top: Math.random() * canvas.getHeight(),
        angle: 0, // 初始角度
        selectable: false
    });

    canvas.add(diTianDiMole);

    // // 在30秒后移除地天地鼠
    // setTimeout(function() {
    //     canvas.remove(diTianDiMole);
    // }, 30000);

    var updateInterval = 2000; // 每2秒更新一次位置
    var pointer = { x: diTianDiMole.left, y: diTianDiMole.top };

    var moveAndUpdate = setInterval(function() {
        // 添加旋转动画
        fabric.util.animate({
            startValue: diTianDiMole.angle,
            endValue: diTianDiMole.angle + 360,
            duration: 2000,
            onChange: function(value) {
                diTianDiMole.set('angle', value);
            }
        });

        // 移动地天地鼠
        fabric.util.animate({
            startValue: diTianDiMole.left,
            endValue: pointer.x,
            duration: 2000,
            onChange: function(value) {
                diTianDiMole.set('left', value);
                canvas.renderAll();
            }
        });
        fabric.util.animate({
            startValue: diTianDiMole.top,
            endValue: pointer.y,
            duration: 2000,
            onChange: function(value) {
                diTianDiMole.set('top', value);
                canvas.renderAll();
            }
        });

        // 检查是否与鼠标重合
        if (Math.abs(diTianDiMole.left - pointer.x) < 20 && Math.abs(diTianDiMole.top - pointer.y) < 20) {
            clearInterval(moveAndUpdate);
            onGameOver(); // 游戏结束
        }
    }, updateInterval);

    // 在鼠标移动时更新目标位置
    canvas.on('mouse:move', function(e) {
        pointer = canvas.getPointer(e.e);
    });
});
}

function onGameOver() {
  // 处理游戏结束逻辑
  console.log("游戏结束");
  gameEnded = true;
  canvas.clear();
  document.getElementById('gameOverScreen').style.display = 'flex';
  function changeSideImage() {
      var sideImage = document.getElementById('sideImage');
      sideImage.src = './images/lqsile.png';
  }
  changeSideImage();
  // (alert("游戏结束！你的分数是: " + score));

  clearInterval(generateMoleInterval);
  clearInterval(generateSpecialMoleInterval);
  clearInterval(generateDiTianDiMoleInterval);
}
