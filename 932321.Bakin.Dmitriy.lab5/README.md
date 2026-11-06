Лабораторная работа №5 — DOM и localStorage

Вариант 6. Тема «Любитель кино и сериалов» — список фильмов к просмотру.

Интерактивная страница без перезагрузки: строки таблицы добавляются и удаляются через DOM API, тема переключается кнопкой, всё состояние сохраняется в localStorage и восстанавливается при перезагрузке.

Файлы

lab.html — разметка страницы плюс секция watchlist (таблица и кнопки)
style.css — стили страницы, темы theme-dark и theme-light, класс hidden
script.js — вся интерактивность: DOM-манипуляции, тема, localStorage

Что умеет страница

Добавить фильм — спрашивает название, год и статус через prompt, создаёт tr с ячейками td и кнопкой «Удалить», вставляет в tbody через appendChild, сохраняет список в localStorage.
Очистить список — удаляет все строки из tbody; если строк нет — показывает alert «Список уже пуст».
Удалить (в каждой строке) — удаляет конкретную строку и сохраняет состояние.
Светлая / Тёмная тема — переключает класс theme-light или theme-dark на body, меняет подпись кнопки, сохраняет выбор.
Скрыть / Показать таблицу — вешает или снимает класс hidden на table-wrapper, меняет подпись кнопки.

Соответствие требованиям задания

getElementById — films-tbody, add-film-btn, clear-films-btn, toggle-theme-btn, toggle-table-btn
querySelector — table-wrapper
querySelectorAll — чтение строк и ячеек (tr, td), очистка списка
Изменение текста — textContent при создании ячеек и подписей кнопок
Изменение атрибутов и классов — classList.add, remove, toggle, contains
Добавление и удаление элементов — createElement, appendChild, append, remove
Переключение темы — applyTheme и loadTheme
Скрытие и показ блока — classList.toggle('hidden') на table-wrapper
Обработка ошибок — ранний return без films-tbody, console.error для каждой отсутствующей кнопки или обёртки, try/catch вокруг JSON.parse и localStorage.setItem
Сохранение в localStorage — watchlistFilms (массив фильмов), watchlistTheme (light или dark)
Восстановление из localStorage — loadFilms и loadTheme при DOMContentLoaded