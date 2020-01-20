/**
 * Create cookie with selected values
 * @param {string} identifier
 * @param {string[]|null} values
 * @param {Object} options
 * @param {Number} options.age - how long the cookie should be stored
 */
export function createCookie(identifier, values, { age }) {
    const date = new Date((new Date).getTime() + (age * 1000));
    const cookieVal = (Array.isArray(values) ? values.join(',') : true);

    document.cookie = `${ identifier }=${ cookieVal }; expires=${ date.toUTCString() }; path=/;`;
}

/**
 * Read cookies in the browser
 * @param  {string} cookieId - cookie id where we will store the user preferences
 * @return {boolean}
 */
export function hasAcceptedCookies(cookieId) {
    if (!document.cookie) {
        return false;
    }

    const cookies = document.cookie.split(/[;\s=]+/);
    return cookies.indexOf(cookieId) !== -1;
}

/**
 * Remove duplicate items from an array
 * @param {Array} arr - target array
 * @returns {Array} cleaned up array
 */
export const arrayUniq = arr => Array.from(new Set(arr));
