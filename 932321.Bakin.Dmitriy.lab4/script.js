const movieDurations = [135, 90, 180, 35, 150, 115, 210];

const userName = prompt("Введите ваше имя:");

function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function filterHighScores(arr) {
    return arr.filter(duration => duration > 120);
}

function calculateSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

const totalDuration = calculateSum(movieDurations);
const longMovies = filterHighScores(movieDurations);
const longMoviesSum = calculateSum(longMovies);
const maxDuration = findMax(movieDurations);

alert(`Привет, ${userName}! Общая длительность просмотра – ${totalDuration} минут, из них ${longMoviesSum} минут – полнометражные фильмы.`);
