let movies = [];

function cleanData(value) {
    return value.replace(/{|}|"|'/g, "").replace(',', ', ');
}

async function loadMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies");
        movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

function displayMovies(filteredMovies) {
    const table = document.getElementById("movieTable");
    table.innerHTML = "";
    filteredMovies.forEach(movie => {
        const row = `<tr>
            <td>${cleanData(movie.title)}</td>
            <td>${movie.release_year}</td>
            <td>${cleanData(movie.director)}</td>
            <td>${movie.box_office}</td>
            <td>${cleanData(movie.country)}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function filterMovies() {
    const search = document.getElementById("search").value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(search));
    displayMovies(filteredMovies);
}

function sortTable(n) {
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = document.querySelector("table").rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
            y = rows[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
            if ((dir === "asc" && x > y) || (dir === "desc" && x < y)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
        }
    }
}

window.onload = loadMovies;
