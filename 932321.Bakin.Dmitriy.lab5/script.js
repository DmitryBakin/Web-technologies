document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_FILMS = 'watchlistFilms';
    const STORAGE_THEME = 'watchlistTheme';

    const tbody = document.getElementById('films-tbody');
    const addBtn = document.getElementById('add-film-btn');
    const clearBtn = document.getElementById('clear-films-btn');
    const themeBtn = document.getElementById('toggle-theme-btn');
    const toggleTableBtn = document.getElementById('toggle-table-btn');
    const tableWrapper = document.querySelector('#table-wrapper');

    if (!tbody) {
        console.error('Не найден элемент: #films-tbody');
        return;
    }

    function safeParse(json) {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error('Ошибка чтения localStorage:', error);
            return null;
        }
    }

    function getFilmsFromDOM() {
        const rows = tbody.querySelectorAll('tr');
        return Array.from(rows).map((row) => {
            const cells = row.querySelectorAll('td');
            return {
                title: cells[0] ? cells[0].textContent.trim() : '',
                year: cells[1] ? cells[1].textContent.trim() : '',
                status: cells[2] ? cells[2].textContent.trim() : ''
            };
        });
    }

    function saveFilms() {
        try {
            localStorage.setItem(STORAGE_FILMS, JSON.stringify(getFilmsFromDOM()));
        } catch (error) {
            console.error('Ошибка сохранения фильмов:', error);
        }
    }

    function createFilmRow(film) {
        const tr = document.createElement('tr');

        const tdTitle = document.createElement('td');
        tdTitle.textContent = film.title;

        const tdYear = document.createElement('td');
        tdYear.textContent = film.year;

        const tdStatus = document.createElement('td');
        tdStatus.textContent = film.status;

        const tdActions = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'btn-delete';
        delBtn.textContent = 'Удалить';

        delBtn.addEventListener('click', () => {
            tr.remove();
            saveFilms();
        });

        tdActions.appendChild(delBtn);

        tr.append(tdTitle, tdYear, tdStatus, tdActions);
        return tr;
    }

    function renderFilms(films) {
        tbody.innerHTML = '';
        films.forEach((film) => {
            tbody.appendChild(createFilmRow(film));
        });
    }

    function loadFilms() {
        const saved = safeParse(localStorage.getItem(STORAGE_FILMS));

        if (Array.isArray(saved)) {
            renderFilms(saved);
        } else {
            const initial = getFilmsFromDOM();
            renderFilms(initial);
            saveFilms();
        }
    }

    function applyTheme(theme) {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');

        if (themeBtn) {
            themeBtn.textContent = theme === 'light' ? 'Тёмная тема' : 'Светлая тема';
        }

        try {
            localStorage.setItem(STORAGE_THEME, theme);
        } catch (error) {
            console.error('Ошибка сохранения темы:', error);
        }
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem(STORAGE_THEME);
        applyTheme(savedTheme === 'light' ? 'light' : 'dark');
    }

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const title = prompt('Название фильма:');
            if (title === null) return;

            if (!title.trim()) {
                alert('Название не может быть пустым');
                return;
            }

            const year = prompt('Год выпуска:', '2024');
            if (year === null) return;

            const status = prompt('Статус (к просмотру / просмотрено):', 'к просмотру');
            if (status === null) return;

            const film = {
                title: title.trim(),
                year: year.trim() || '—',
                status: status.trim() || 'к просмотру'
            };

            tbody.appendChild(createFilmRow(film));
            saveFilms();
        });
    } else {
        console.error('Не найдена кнопка: #add-film-btn');
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const rows = tbody.querySelectorAll('tr');

            if (rows.length === 0) {
                alert('Список уже пуст');
                return;
            }

            rows.forEach((row) => row.remove());
            saveFilms();
        });
    } else {
        console.error('Не найдена кнопка: #clear-films-btn');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('theme-light');
            applyTheme(isLight ? 'dark' : 'light');
        });
    } else {
        console.error('Не найдена кнопка: #toggle-theme-btn');
    }

    if (toggleTableBtn && tableWrapper) {
        toggleTableBtn.addEventListener('click', () => {
            tableWrapper.classList.toggle('hidden');

            const isHidden = tableWrapper.classList.contains('hidden');
            toggleTableBtn.textContent = isHidden ? 'Показать таблицу' : 'Скрыть таблицу';
        });
    } else {
        if (!toggleTableBtn) console.error('Не найдена кнопка: #toggle-table-btn');
        if (!tableWrapper) console.error('Не найден контейнер: #table-wrapper');
    }

    loadTheme();
    loadFilms();
});