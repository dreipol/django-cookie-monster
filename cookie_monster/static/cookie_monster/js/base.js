(function() {
    var BANNER_CLASSNAME = 'cookie-monster-banner';
    var COOKIE_IDENTIFIER = window.__js_base_cookie_bridge.cookie_identifier;
    // var COOKIE_AGE = window.__js_base_cookie_bridge.cookie_age;
    var COOKIE_AGE = 604800;
    var BANNER_BTN_DATA_ATTR = 'data-cookiemonster-accept';

    /**
     * Create facet for base classname
     * @param {string} name
     * @return {string}
     */
    function createFacet(name) {
        return BANNER_CLASSNAME + '__' + name;
    }

    /**
     * Accept all available cookie groups
     */
    function acceptAllCookies() {
        createCookie(COOKIE_IDENTIFIER, getAllCookies());
        activateBanner('.' + BANNER_CLASSNAME, false);
    }

    /**
     * Set a group of selected cookies
     */
    function acceptSelectedCookies() {
        createCookie(COOKIE_IDENTIFIER, getCheckedCookies());
        activateBanner('.' + BANNER_CLASSNAME, false);
    }

    /**
     * Read cookies in the browser
     * @return {boolean}
     */
    function hasAcceptedCookies() {
        if (!document.cookie) {
            return false;
        }

        var cookies = document.cookie.split(/[;\s=]+/);
        return cookies.indexOf(COOKIE_IDENTIFIER) !== -1;
    }

    /**
     * Get selected cookies
     * @return {string[]}
     */
    function getCheckedCookies() {
        return Array.from(document.querySelectorAll('.' + BANNER_CLASSNAME + ' input[type="checkbox"]:checked')).map(function(el) {
            return el.value;
        })
    }

    /**
     * Get all available cookies
     * @return {string[]}
     */
    function getAllCookies() {
        return Array.from(document.querySelectorAll('.' + BANNER_CLASSNAME + ' input[type="checkbox"]')).map(function(el) {
            return el.value;
        })
    }

    /**
     * Create cookie with selected values
     * @param {string} identifier
     * @paramn {string[]|null} values
     */
    function createCookie(identifier, values) {
        var date = new Date((new Date).getTime() + (COOKIE_AGE * 1000));
        var cookieVal = (Array.isArray(values) ? values : true);
        var cookieValue = identifier + '=' + cookieVal;
        cookieValue += '; expires=' + date.toUTCString();
        cookieValue += '; path=/;';
        document.cookie = cookieValue;
    }

    /**
     * Set the banner state
     * @param {string} elem
     * @param {boolean} show
     */
    function activateBanner(elem, show) {
        var el = document.querySelectorAll(elem);
        el.forEach(function(element) {
            if (show) {
                element.classList.add(createFacet('active'));
            } else {
                element.classList.remove(createFacet('active'));
            }
        });
    }

    document.querySelectorAll('[' + BANNER_BTN_DATA_ATTR + ']').forEach(function(element) {
        element.addEventListener('click', function() {
            /** @var {HTMLElement} */
            var elm = this;
            var val = elm.getAttribute(BANNER_BTN_DATA_ATTR);

            if (val === 'all') {
                acceptAllCookies();
            } else {
                acceptSelectedCookies();
            }

        });
    });

    if (!hasAcceptedCookies()) {
        activateBanner('.' + BANNER_CLASSNAME, true);
    }
})();

