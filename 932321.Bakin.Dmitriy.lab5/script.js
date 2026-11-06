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
});