import * as px from 'pixi.js';

// создаем рендерер (отрисовщик?) и задаем размеры
// по умолчанию, пикси будет использовать WebGL
// если браузер такого не умеет, то откатится на тормозной канвас
const renderer = px.autoDetectRenderer({
    height: 400,
    width: 400,

    // для примера, сделаем цвет фона синим
    backgroundColor: 0x0000AA,

    // но прозрачным
    transparent: true,

    antialias: true,
});

// добавляем созданный канвас на страницу
document.body.appendChild(renderer.view);

// создаем контейнер для сцены
const stage = new px.Container();

const render = () => {
    renderer.render(stage);
}

// Рисуем линию
const line = new px.Graphics();

// задаем стиль для линии, ее ширину,
// цвет, прозрачность
line.lineStyle(10, 0xD5402B, 1);

// задаем координаты для рисования
line.position.x = renderer.width / 2;
line.position.y = renderer.height / 2;

// перемещаем "центр" линии (точка, относительно которой будет производиться наклон)
// в центр элемента
line.pivot.set(0, 140);

// задаем угол наклона (в радианах, гугл поможет перевести в них привычные градусы)
line.rotation = .785398;

// и, наконец, рисуем саму линию
line.moveTo(5, 0);
line.lineTo(5, 280);
stage.addChild(line);


// Рисуем окружность
const circle = new px.Graphics();
// тоже самое, что и для линии
circle.lineStyle(20, 0x91CF46, 1);
// отрисовываем круг (x, y, радиус)
circle.drawCircle(
    renderer.width / 2,
    renderer.height / 2,
    100,
);

stage.addChild(circle);


const rect = new px.Graphics();
rect.lineStyle(5, 0xD82257, 1);
// x, y, ширина и высота
rect.drawRect(
    renderer.width - 100,
    renderer.height - 100,
    80,
    80,
);
stage.addChild(rect);

const filledRect = new px.Graphics();
// а здесь, вместо задания стиля линии
// просто зальем прямоугольник цветом
filledRect.beginFill(0x709FE9, 1);
filledRect.drawRect(20, 20, 100, 100);
filledRect.endFill();
stage.addChild(filledRect);


const triangle = new px.Graphics();

triangle.lineStyle(5, 0x4A5FB4, 1);
triangle.moveTo(20, 300);
triangle.lineTo(100, 380);
triangle.lineTo(20, 380);
triangle.lineTo(20, 300);

stage.addChild(triangle);

// отрисовываем сцену на канвасе
render();

