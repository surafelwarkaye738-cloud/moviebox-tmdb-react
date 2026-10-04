/*
  Name used to store My List
  inside the browser localStorage.
*/
export const MY_LIST_STORAGE_KEY =
  "netflix_clone_my_list";

/*
  Get saved movies from localStorage.
*/
export const getStoredMyList = () => {
  try {
    /*
      Read the saved JSON string.
    */
    const storedData =
      localStorage.getItem(
        MY_LIST_STORAGE_KEY
      );

    /*
      Nothing has been saved yet.
    */
    if (!storedData) {
      return [];
    }

    /*
      Convert JSON back into
      a JavaScript array.
    */
    const parsedData =
      JSON.parse(storedData);

    /*
      Make sure the saved value
      is actually an array.
    */
    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData;
  } catch (error) {
    /*
      If localStorage contains
      invalid data, don't crash
      the application.
    */
    console.error(
      "Failed to read My List:",
      error
    );

    return [];
  }
};

/*
  Save movies to localStorage.
*/
export const saveStoredMyList = (
  movies
) => {
  try {
    /*
      Convert the array into JSON
      and save it.
    */
    localStorage.setItem(
      MY_LIST_STORAGE_KEY,
      JSON.stringify(movies)
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to save My List:",
      error
    );

    return false;
  }
};

/*
  Remove all saved movies.
*/
export const clearStoredMyList = () => {
  try {
    localStorage.removeItem(
      MY_LIST_STORAGE_KEY
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to clear My List:",
      error
    );

    return false;
  }
};