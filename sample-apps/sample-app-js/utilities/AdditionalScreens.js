// Helper class to handle setup and display of FaceTec Server Upgrade View
var AdditionalScreens = /** @class */ (function () {
    function AdditionalScreens() {
    }
    AdditionalScreens.elementToCopyStylesFrom = "";
    // Set the styling to match the control element which has already been styled for desktop or mobile.
    // Set the button in the view the call the passed in exit function
    AdditionalScreens.setServerUpgradeStyling = function (elementToCopyStylesFrom, functionToCallOnExitFromAdditionalScreen) {
        // If the width is not set this is the initial styling, otherwise return, we only need to do this once
        if (document.getElementById("additional-screen").style.width !== "") {
            return;
        }
        AdditionalScreens.elementToCopyStylesFrom = elementToCopyStylesFrom.id;
        if (AdditionalScreens.elementToCopyStylesFrom === "") {
            console.error("elementToCopyStylesFrom must have an id");
        }
        var computedStyles = getComputedStyle(elementToCopyStylesFrom);
        var serverUpgradeElement = document.getElementById("additional-screen");
        serverUpgradeElement.style.width = computedStyles.width;
        serverUpgradeElement.style.height = computedStyles.height;
        serverUpgradeElement.style.border = computedStyles.border;
        serverUpgradeElement.style.borderRadius = computedStyles.borderRadius;
        serverUpgradeElement.style.margin = computedStyles.margin;
        document.getElementById("additional-screen-button").onclick = functionToCallOnExitFromAdditionalScreen;
    };
    // Fade out the main UI and show the Server Upgrade view
    AdditionalScreens.showServerUpGradeView = function () {
        document.getElementById("additional-screen-logo").src = ServerUpgradeLogo;
        document.querySelector("#additional-screen h2").innerHTML = "Server Upgrade In Progress";
        document.getElementById("additional-screen-text").innerHTML = "Please Try Again in 10-15 minutes.";
        AdditionalScreens.showAdditionalScreen();
    };
    // Display the additional screen
    AdditionalScreens.showAdditionalScreen = function () {
        document.getElementsByClassName("loading-session-token-container")[0].style.visibility = "hidden";
        document.getElementById("additional-screen").style.opacity = "0";
        document.getElementById("additional-screen").style.display = "flex";
        (0, SampleAppUIFunctions)(".wrapping-box-container").fadeOut(1);
        (0, SampleAppUIFunctions)("#theme-transition-overlay").fadeOut(200);
        (0, SampleAppUIFunctions)("#additional-screen").fadeOut(200, function () {
            (0, SampleAppUIFunctions)("#" + AdditionalScreens.elementToCopyStylesFrom).fadeOut(1);
            (0, SampleAppUIFunctions)("#additional-screen").fadeIn(700, function () {
                (0, SampleAppUIFunctions)(".wrapping-box-container").show();
            });
        });
    };
    // Exit the Server Upgrade View and return to the normal UI view
    AdditionalScreens.exitAdditionalScreen = function (fadeInMainUIFunction) {
        (0, SampleAppUIFunctions)("#additional-screen").fadeOut(100, function () {
            (0, SampleAppUIFunctions)(".loading-session-token-container").fadeOut(1);
            (0, SampleAppUIFunctions)("#controls").fadeIn(400, function () {
                fadeInMainUIFunction();
                document.getElementsByClassName("loading-session-token-container")[0].style.visibility = "visible";
            });
        });
    };
    return AdditionalScreens;
}());
var AdditionalScreens = AdditionalScreens;
