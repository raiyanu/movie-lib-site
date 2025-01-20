export function loadFavoriteMovieDB() {
    return localStorage.getItem("FavoriteMovieDB")
        ? JSON.parse(localStorage.getItem("FavoriteMovieDB")).reverse()
        : [];
}

export function updateFavoriteMovieDB(favorite) {
    localStorage.setItem("FavoriteMovieDB", JSON.stringify(favorite));
}
export function toggleFavoriteDB(id) {
    if (loadFavoriteMovieDB().includes(id)) {
        console.log("removing");
        return removeFavoriteMovieDB(id);
    } else {
        console.log("adding");
        return addFavoriteMovieDB(id);
    }
}

export function addFavoriteMovieDB(id) {
    let favorite = loadFavoriteMovieDB();
    if (!favorite.includes(id)) favorite.push(id);
    updateFavoriteMovieDB(favorite);
    console.log(favorite);
    return true;
}

export function removeFavoriteMovieDB(id) {
    let favorite = loadFavoriteMovieDB();
    favorite = favorite.filter((AvailableId) => AvailableId != id);
    updateFavoriteMovieDB(favorite);
    console.log(favorite);
    return false;
}
export function clearAwayMovieDB() {
    localStorage.removeItem("FavoriteMovieDB");
    console.log("clearing all the favorite lists");
}