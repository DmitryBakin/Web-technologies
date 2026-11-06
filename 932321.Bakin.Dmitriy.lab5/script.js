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
});