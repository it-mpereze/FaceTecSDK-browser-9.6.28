// UI Convenience Functions
var SampleAppUIFunctions = function (elementString) {
    // Get the element(s) for ui operations from the elementString;
    var currentElements = document.querySelectorAll(elementString);
    // Save the original display property of the element before hiding it
    var saveDisplayForElement = function (el) {
        var display = window.getComputedStyle(el).display;
        if (display && display !== "none") {
            el.setAttribute("displaytype", display);
        }
    };
    // Set the display of the element to either block or restore it's original value
    var setDisplayForElement = function (el) {
        var display = "block";
        if (el.getAttribute("displaytype")) {
            display = el.getAttribute("displaytype");
        }
        el.style.display = display;
    };
    // Fade in the element to opacity over duration ms with an optional callback
    var fadeIn = function (el, opacity, duration, callback) {
        if (!el) {
            return;
        }
        opacity = opacity || "1";
        duration = duration || 1;
        var computedStyle = window.getComputedStyle(el);
        if (computedStyle.display === "none" && computedStyle.opacity === "1") {
            el.style.opacity = "0";
        }
        el.style.visibility = "visible";
        saveDisplayForElement(el);
        setDisplayForElement(el);
        //@ts-ignore
        el.style["-webkit-transition"] = "opacity " + duration + "ms";
        //@ts-ignore
        el.style["-moz-transition"] = "opacity " + duration + "ms";
        //@ts-ignore
        el.style["-o-transition"] = "opacity " + duration + "ms";
        el.style["transition"] = "opacity " + duration + "ms";
        // Allow JS to clear execution stack
        window.setTimeout(function () {
            requestAnimationFrame(function () {
                el.style.opacity = opacity;
            });
        });
        window.setTimeout(function () {
            setDisplayForElement(el);
            if (callback) {
                callback();
            }
        }, duration);
    };
    // Fade out the element to opacity over duration ms with an optional callback
    var fadeOut = function (el, opacity, duration, callback) {
        if (!el) {
            return;
        }
        saveDisplayForElement(el);
        opacity = opacity || "0";
        duration = duration || 1;
        //@ts-ignore
        el.style["-webkit-transition"] = "opacity " + duration + "ms";
        //@ts-ignore
        el.style["-moz-transition"] = "opacity " + duration + "ms";
        //@ts-ignore
        el.style["-o-transition"] = "opacity " + duration + "ms";
        el.style["transition"] = "opacity " + duration + "ms";
        // Allow JS to clear execution stack
        window.setTimeout(function () {
            requestAnimationFrame(function () {
                el.style.opacity = opacity;
            });
        });
        window.setTimeout(function () {
            el.style.display = "none";
            if (callback) {
                callback();
            }
        }, duration);
    };
    return {
        fadeOut: function (duration, callback) {
            currentElements.forEach(function (element) {
                fadeOut(element, "0", duration, callback);
            });
        },
        fadeIn: function (duration, callback) {
            currentElements.forEach(function (element) {
                fadeIn(element, "1", duration, callback);
            });
        },
        show: function () {
            currentElements.forEach(function (element) {
                element.style.opacity = "1";
                setDisplayForElement(element);
            });
        },
        hide: function () {
            currentElements.forEach(function (element) {
                element.style.opacity = "0";
                setDisplayForElement(element);
            });
        },
        scrollTop: function (value) {
            currentElements.forEach(function (element) {
                element.scrollTop = value;
            });
        },
        css: function (styleProperTies) {
            if (typeof styleProperTies !== "object") {
                throw new Error("UI.css must be called with an object");
                return;
            }
            currentElements.forEach(function (element) {
                Object.keys(styleProperTies).map(function (style) {
                    //@ts-ignore
                    element.style[style] = styleProperTies[style];
                });
            });
        }
    };
};
SampleAppUIFunctions = SampleAppUIFunctions;
