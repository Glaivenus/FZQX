function updateCanvasBackground(canvas) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    var backgroundImageIndex = dayOfYear % backgrounds.length; // 每天更新背景图

    if (currentHour >= 23 || currentHour < 1) { // 在23点后或0点前更新背景
        fabric.Image.fromURL(backgrounds[backgroundImageIndex], function(img) {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top',
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
                selectable: false
            });
        });
    }
}