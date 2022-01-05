/**
 * @author Mohammadali Rashidfarokhi
 */

/**
 * Function to fetch data from server
 * @param {string} url -- URL to connect and fetch data from the server
 * @returns {Object} data from the server
 */
export function fetchQuestion (url) {
  return fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      return data
    })
}
