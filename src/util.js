import { get, template } from 'lodash-es';

/**
 * Create cookie with selected values
 * @param {string} identifier
 * @param {string[]|null} values
 * @param {object} options
 * @param {number} options.age - how long the cookie should be stored
 */
export function createCookie(identifier, values, { age }) {
    const date = new Date((new Date()).getTime() + (age * 1000));
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
 * @return {Array} cleaned up array
 */
export const arrayUniq = arr => arr.filter((v, i, a) => a.indexOf(v) === i);

/**
 * Application vocabulary
 * @type {object}
 */
const vocabulary = {};

/**
 * Initialize the vocabulary with the user defined properties
 * @param definitions
 * @return {object}
 */
export const initVocabulary = definitions => Object.assign(vocabulary, definitions);

/**
 * Get a value from the vocabulary
 * @param {string} path - path to the key
 * @param {object} variables - variables to interpolate to the string matched
 * @return {string}
 */
export const translate = (path, variables) => {
    const string = get(vocabulary, path, path);

    if (variables) {
        return template(string, {
            interpolate: /{([\s\S]+?)}/g,
        })(variables.values);
    }

    return string;
};
