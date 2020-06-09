import * as PIXI from 'pixi.js';

const renderer = PIXI.autoDetectRenderer({
    height: window.innerHeight,
    width: window.innerWidth,
    transparent: true,
    antialias: true,
});

document.body.appendChild(renderer.view);

// создаем контейнер для сцены
const stage = new PIXI.Container();

// этот флаг как раз отвечает за то,
// что бы включить обработку пользовательскиъ событий
stage.interactive = true;

// создадим круг
const circle = new PIXI.Graphics();
// ему тоже нужен флаг интерактивности
circle.interactive = true;
circle.beginFill(0xff0000);
circle.drawCircle(0, 0, 30);
circle.x = renderer.width / 2;
circle.y = renderer.height / 2;
circle.endFill();
stage.addChild(circle);

// начнем создавать обработчики событий
// хэндлеры у нас используют this
// это значит, что данные будут сохраняться
// в переносимых объектах, а не где-то глобально
// это позволит корректно работать с мультитачем
// и переиспользовать их для разных элементов

function onDragStart(e) {
    // сохраняем данные из события
    this.data = e.data;
    // во время переноса сделаем элемент полпрозрачным
    this.alpha = .5;
    // и поставим флаг, что этот элемент сейчас тащат
    this.dragging = true;
}

function onDragEnd(e) {
    // просто обнуляем все, что установили в onDragStart
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
}

function onDragMove(e) {
    // если флаг не установлен, то
    // мы просто провели мышью наж элементов - игнорируем
    if (!this.dragging) {
        return;
    }

    // получаем координаты мыши и изменяем координаты круга на них
    const newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
}

// навешиваем все возможные события
// к сожалению, да, они нам все нужны
circle
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);


const main = () => {
    // отрисовываем
    renderer.render(stage);
    // и просим браузер вызвать этот же main,
    // когда он будет готов орисовать следующий кадр
    requestAnimationFrame(main)
}

main();
