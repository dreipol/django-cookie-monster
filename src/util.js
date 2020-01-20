/**
 * Create cookie with selected values
 * @param {string} identifier
 * @param {string[]|null} values
 * @param {Object} options
 * @param {Number} options.age - how long the cookie should be stored
 */
export function createCookie(identifier, values, { age }) {
    var date = new Date((new Date).getTime() + (age * 1000));
    var cookieVal = (Array.isArray(values) ? values : true);
    var cookieValue = identifier + '=' + cookieVal;
    cookieValue += '; expires=' + date.toUTCString();
    cookieValue += '; path=/;';
    document.cookie = cookieValue;
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

    var cookies = document.cookie.split(/[;\s=]+/);
    return cookies.indexOf(cookieId) !== -1;
}
