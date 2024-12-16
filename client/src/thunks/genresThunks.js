import {
    fetchGenresRequest,
    fetchGenresSuccess,
    fetchGenresFailure,
    addGenreRequest,
    addGenreSuccess,
    addGenreFailure,
    updateGenreRequest,
    updateGenreSuccess,
    updateGenreFailure,
    deleteGenreRequest,
    deleteGenreSuccess,
    deleteGenreFailure,
  } from "../actions/genresActions";
  
  export const fetchGenres = () => async (dispatch) => {
    dispatch(fetchGenresRequest());
    try {
      const response = await fetch("/genres");
      const genres = await response.json();
      dispatch(fetchGenresSuccess(genres));
    } catch (error) {
      dispatch(fetchGenresFailure(error.message));
    }
  };
  
  export const addGenre = (genreData) => async (dispatch) => {
    dispatch(addGenreRequest());
    try {
      const response = await fetch("/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genreData),
      });
      const newGenre = await response.json();
      dispatch(addGenreSuccess(newGenre));
    } catch (error) {
      dispatch(addGenreFailure(error.message));
    }
  };
  
  export const updateGenre = (id, genreData) => async (dispatch) => {
    dispatch(updateGenreRequest());
    try {
      const response = await fetch(`/genres/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genreData),
      });
      const updatedGenre = await response.json();
      dispatch(updateGenreSuccess(updatedGenre));
    } catch (error) {
      dispatch(updateGenreFailure(error.message));
    }
  };
  
  export const deleteGenre = (id) => async (dispatch) => {
    dispatch(deleteGenreRequest());
    try {
      await fetch(`/genres/${id}`, { method: "DELETE" });
      dispatch(deleteGenreSuccess(id));
    } catch (error) {
      dispatch(deleteGenreFailure(error.message));
    }
  };
  