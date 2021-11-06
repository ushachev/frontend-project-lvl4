const messages = [
  {
    username: 'admin',
    body: 'Дипломный проект строится на технологиях, используемых в повседневной работе фронтенд-разработчиками в целом и React-разработчиками в частности. Его цель - показать спектр всех стандартных задач, с которыми придётся столкнуться в реальной жизни. Среди них: работа с веб-сокетами, взаимодействие с REST API, использование React (с хуками), Redux (через reduxjs/toolkit), организация роутинга на клиента, авторизация и аутентификация и, конечно же, сборка (webpack) и деплой (heroku).',
  },
  {
    username: 'user',
    body: 'React - наиболее востребованное решение для создания фронтенда уже много лет. Оставаясь простым в своём базовом использовании, он оброс большим количеством возможностей, которые важно использовать с умом. К ним относятся и хуки, и контекст, и прямое взаимодействие с DOM, и различные механизмы для оптимизации производительности. Большая часть этих тем задействована в проекте и отрабатывается на необходимом для закрепления уровне.',
  },
  {
    username: 'admin',
    body: 'Но для создания по-настоящему больших и легко поддерживаемых приложений одного React недостаточно. Невероятно важно то как происходит управление состоянием. Несмотря на наличие подобного механизма внутри самого React, по разным причинам он используется только для небольших проектов или отдельных компонентов. Общее же состояние приложения хранится в библиотеках, подобных Redux. Сейчас в мире React стандартом для управления состоянием стала библиотека reduxjs/toolkit, которая не только соединяет Redux и React, но так же включает в себя большое количество необходимых дополнений, значительно упрощающих работу и сокращающих шаблонный код.',
  },
  {
    username: 'user',
    body: 'Программирование форм на фронтенде - сложная задача со множеством нюансов и, как правило, огромными "простынями" кода для реализации даже небольших форм. Валидация, Ajax, сетевые ошибки, запоминание состояния вводимых элементов, вывод ошибок – всё это требует кода, много кода. И количество кода пропорционально количеству полей в форме. К счастью, за годы существования React, сторонние разработчики создали множество важных дополнений и выработали удачные архитектурные подходы для работы с формами. Одна из таких библиотек (Formik) используется в этом проекте.',
  },
  {
    username: 'admin',
    body: 'Для упрощения создания внешнего вида, в этом проекте используется библиотека react-bootstrap. Она состоит из элементов и компонентов бутстрапа переведённых на React. С её помощью гораздо быстрее создавать интерфейсы основанные на бутстрапе, так как готовые компоненты автоматически подставляют необходимые атрибуты (например доступность) и содержат в себе необходимую логику.',
  },
  {
    username: 'user',
    body: 'Никакая разработка не обходится без продакшена, а там где продакшен там эксплуатация. Сборка бандла, деплой, мониторинг ошибок в продакшене (Rollbar) – это далеко не полный перечень того, с чем придётся столкнуться не только в реальной жизни, но и в этом проекте.',
  },
  {
    username: 'admin',
    body: 'Socket.io. Performant. In most cases, the connection will be established with WebSocket, providing a low-overhead communication channel between the server and the client.',
  },
  {
    username: 'admin',
    body: 'Socket.io. Reliable. Rest assured! In case the WebSocket connection is not possible, it will fall back to HTTP long-polling. And if the connection is lost, the client will automatically try to reconnect.',
  },
  {
    username: 'admin',
    body: 'Socket.io. Scalable. Scale to multiple servers and send events to all connected clients with ease.',
  },
];

export default messages;
