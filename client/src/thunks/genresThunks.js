import {
  // fetchGenresRequest,
  // fetchGenresSuccess,
  // fetchGenresFailure,
  // addGenreRequest,
  addGenreSuccess,
  // addGenreFailure,
  updateGenreRequest,
  updateGenreSuccess,
  updateGenreFailure,
  deleteGenreRequest,
  deleteGenreSuccess,
  deleteGenreFailure,
} from "../actions/genresActions";
// import { checkSession } from "./usersThunks";

// Fetch genres
export const fetchGenres = () => async (dispatch) => {
  try {
    const response = await fetch('/genres'); // Your API endpoint for genres
    const data = await response.json();

    // Make sure that 'data' is an array
    dispatch({ type: 'SET_GENRES', payload: data }); // Store genres in Redux
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

// Add genre
export const addGenre = (genreData) => async (dispatch) => {
  try {
    const response = await fetch('/genres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genreData),
    });
    if (!response.ok) throw new Error('Failed to add genre');
    const newGenre = await response.json();

    // Dispatch the action to add the genre to the Redux store
    dispatch(addGenreSuccess(newGenre));

    // Optionally, you could refetch genres here to keep the list fresh
    dispatch(fetchGenres());  // This will re-fetch the genres list

  } catch (error) {
    // Handle error (you can dispatch failure actions here)
    console.error("Error adding genre:", error);
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
