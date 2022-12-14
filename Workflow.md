## Начало работы

Для работы с данной сборкой в новом проекте, склонируйте все содержимое репозитория <br>
`git clone <this repo>`
Затем, находясь в корне проекта, запустите команду `npm i`, которая установит все находящиеся в package.json зависимости.
После этого вы можете использовать любую из четырех предложенных команд сборки (итоговые файлы попадают в папку __build__ корневой директории): <br>

`gulp` - базовая команда, которая запускает сборку для разработки, используя browser-sync.

`gulp build` - команда для сборки продакшн-версии проекта или для дальнейшей посадки (изображения и библиотеки минифицируются, скрипты транспилируются babel) без включения сервера browser-sync.

`gulp server` - команда, которая запускает сервер browser-sync. Команду стоит запускать когда в папке __build__ корневой директории уже есть файлы собранные файлы проекта (после команды `gulp`).

`gulp clean` - команда удаления всех файлов из папки __build__ корневой директории.

## Структура папок и файлов

```
├── .github/                         # Папка для скриптов github action
├── src/                             # Исходники
│   ├── assets/                      # Папка для хранения иных ресурсов проекта (php, видео-файлы, favicon и т.д.)
│   │   └── fonts/                   # Папка для хранения шрифтов в формате woff2
│   ├── html/                        # Папка для хранения html-блоков страницы
│   │   └── main/                    # Пример папки для подключения блоков страницы, для удобного структурирования файлов
│   ├── img/                         # Папка для хранения картинок
│   │   └── sprite/                  # Специальная папка для svg-файлов, которые будут объединяться в svg-спрайт
│   │   └── svg-folders/             # Специальная папка для папок с svg-файлами
│   ├── js/                          # Скрипты
│   │   ├── modules/                 # Папка с подключаемыми JS-модулями
│   │   └── main.js                  # Главный скрипт, точка входа
│   ├── style/                       # Папка со стилями проекта (препроцессор sass в scss-синтаксисе)
│   │   ├── blocks/                  # SCSS-компоненты
│   │   │    └── main/               # Пример папки для подключения стилей страницы, для удобного структурирования файлов
│   │   ├── mixins/                  # Папка для сохранения готовых scss-миксинов
│   │   ├── settings/                # Папка для хранения общих настроек стилей
│   │   │    └──_animations.scss     # Файл для стилей анимаций
│   │   │    └──_global.scss         # Файл для для глобальных стилей
│   │   │    └──_typographics.scss   # Файл для для стилей типографики
│   │   │    └──_utils.scss          # Файл для утилитарных классов
│   │   ├── _fonts.scss              # Файл для подключения шрифтов (можно использовать миксин)
│   │   ├── _mixins.scss             # Файл для подключения миксинов из папки mixins
│   │   ├── _mixins.scss             # Файл для подключения общих настроек стилей
│   │   ├── _vars.scss               # Файл для написания css- или scss-переменных
│   │   ├── main.scss                # Главный файл стилей
│   │   └── vendor-bundle.scss       # Файл для подключения стилей библиотек из папки vendor
│   ├── vendor/                      # Папка со сторонними библиотеками
│   └── index.html                   # Главный html-файл
├── .csscomb.json                    # Файл с настройками упорядочивания свойств css-файлов в сборке
├── .editorconfig                    # Файл с настройками форматирования кода
├── .eslint                          # Файл с настройками линтера eslint
├── .eslintignore                    # Файл с настройками исключений для линтера eslint
├── .gitattributes                   # Файл,с настройками git аттрибутов
├── .gitignore                       # Файл, указывающий неотслеживаемые git файлы и папки 
├── gulpfile.js                      # Файл с настройками сборки
├── package.json                     # Файл с настройками сборки и установленными пакетами
├── package-lock.json                # Файл с настройками пакетов для локальных зависимостей
└── README.md                        # Информация о сборке
└── Workflow.md                      # Инструкция по работе со сборкой
```

## Оглавление
1. [npm-скрипты](#npm-скрипты)
2. [Работа с html](#работа-с-html)
3. [Работа с CSS](#работа-с-css)
4. [CSS-миксины](#css-миксины)
5. [Работа с JavaScript](#работа-с-javascript)
6. [Работа со шрифтами](#работа-со-шрифтами)
7. [Работа с изображениями](#работа-с-изображениями)
8. [Работа с иными ресурсами](#работа-с-иными-ресурсами)
9. [Работа с ES Lint](#работа-с-es-lint)


## npm-скрипты

Вы можете вызывать gulp-скрипты через npm.

`npm start` - команда, аналогичная команде gulp.

`npm run build` - команда, аналогичная команде gulp build.

`npm run prod` - команда, аналогичная команде gulp build + проверка линтером перед сборкой.

`npm run server` - команда, аналогичная команде gulp server.

`npm run clean` - команда, аналогичная команде gulp clean.

`npm run lint` - команда, проверяющая линтером js файлы.

## Работа с html

Благодаря плагину __gulp-file-include__ вы можете разделять html-файл на различные шаблоны, которые должны храниться в папке __html__. Удобно делить html-страницу на секции.

> Для вставки html-частей в главный файл используйте `@include('html/filename.html')`

Если вы хотите создать многостраничный сайт - копируйте __index.html__, переименовывайте как вам нужно, и используйте.

## Работа с CSS

В сборке используется препроцессор __sass__ в синтаксисе __scss__. Все стили проекта хранятся в папке __style__.

Стили, написанные в __blocks__, следует подключать в __main.scss__.

Стили из __fonts__, __settings__, __vars__ и __mixins__ так же подключены в __main.scss__.

Сторонние css-файлы (библиотеки) подключите в файле __vendor-bundle.scss__.

> Для подключения css-библиотеки используйте команду `@import "../vendor/library-folder/library-name";`. Обратите внимание, что в конце имени файла библиотеки не пишется расширение .css!

Если вы хотите создать свой миксин - делайте это в папке __mixins__, а затем подключайте в файл __mixins.scss__.

> Для подключения файлов используйте директиву `@import`

В итоговой папке __build/style__ создаются два файла: <br> __main.css__ - для стилей страницы, <br> __vendor-bundle.css__ - для стилей всех библиотек, использующихся в проекте.

## Работа с JavaScript

Файл __main.js__ используется как точка входа и подключается к проекту как `type="module"`.

JS-код лучше делить на компоненты - небольшие js-файлы, которые содержат свою, изолированную друг от друга реализацию. Сами модули лучше помещайте в папку __modules__.
> Папка __modules__ скопируется со всем содержимым в __build/js__

Чтобы подключить сторонние js-файлы (библиотеки) просто скопируйте их в папку __src/vendor__ в папку, соответствующую библиотеке. Сборка соберет все js файлы библиотек и сделает из них общий бандл. и подключит в проект.

## Работа со шрифтами

Т.к. автор не поддерживает IE11, в сборке реализована поддержка только формата __woff2__ (это значит, что в миксине подключения шрифтов используется только данный формат).

Загружайте файлы __woff2__ в папку __assets/fonts__, а затем вызывайте миксин `@font-face` в файле __fonts.scss__.

## Работа с изображениями

Любые файлы изображений, кроме __favicon__ копируются в папку __img__.

Если вам нужно сделать svg-спрайт, кладите нужные для спрайта svg-файлы в папку __img/sprite__. Иные svg-файлы просто оставляйте в папке __img__ или, если необходимо использовать папку с svg-файлами, то папку с файлами нужно положить в папку __img/svg-folders__

При использовании команд `gulp build`, вы получите минифицированные изображения в итоговой папке __build/img__.

## Работа с иными ресурсами

Иные ресурсы проекта, под которые не отведена соответствующая папка, должны храниться в папке __assets__. Это могут быть видео-файлы, php-файлы, favicon и прочие файли или папки с ними.

## Работа с ES Lint

При добавлении js-библиотеки с новым классом, добавьте этот в класс в конфигурационный файл `.eslintrc`.
