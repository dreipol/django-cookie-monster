var cookieValues = [];

// Checks if the cookie was set
if (checkCookies() === false) {
    cookieBannerFadeIn("cookieMakerContainer")
}

// Set only one cookie
function setCookieBase() {
    createCookie();
    cookieBannerFadeOut("cookieMakerContainer");
}

// Set a group of selected cookies
function setSelectedCookies() {
    getCheckedCookies();
    createCookie();
    cookieBannerFadeOut("cookieMakerContainer");
}

// Set all cookies in the group
function setAllCookies() {
    selectAllCookies();
    createCookie();
    cookieBannerFadeOut("cookieMakerContainer");
}

// Read cookies in the browser
function checkCookies() {
    var cookieList = (document.cookie) ? document.cookie.split(/[;\s=]+/).indexOf(window.__js_base_cookie_bridge.cookie_identifier) : [];
    return cookieList !== -1;
}

// Push the checked cookies into an array
function getCheckedCookies() {
    document.querySelectorAll('.cookieMakerContainerContent input[type="checkbox"]:checked').forEach(function (el) {
        return cookieValues.push(' ' + el.value);
    })
}

// Push all cookies into an array
function selectAllCookies() {
    document.querySelectorAll('.cookieMakerContainerContent input[type="checkbox"]').forEach(function (el) {
        return cookieValues.push(' ' + el.value);
    })
}

// Logic to create the cookie
function createCookie() {
    var expires = "";
    var config = window.__js_base_cookie_bridge;
    if (config.cookie_age) {
        var date = new Date();
        date.setTime(date.getTime() + (config.cookie_age * 365 * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = config.cookie_identifier + "=" + ((cookieValues.length > 0) ? cookieValues : true) + expires + "; path=/";
}

// Fade banner functions
function cookieBannerFadeIn(elem, display) {
    var el = document.getElementById(elem);
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .02) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

function cookieBannerFadeOut(elem) {
    var el = document.getElementById(elem);
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .02) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};
