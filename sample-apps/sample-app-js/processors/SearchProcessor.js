//
// Welcome to the annotated FaceTec Device SDK core code for performing secure Authentication against a previously enrolled user.
//
var SearchProcessor = void 0;
//
// This is an example self-contained class to perform Authentication with the FaceTec SDK.
// You may choose to further componentize parts of this in your own Apps based on your specific requirements.
//
var SearchProcessor = /** @class */ (function () {
    function SearchProcessor(sampleAppControllerReference) {
        this.latestNetworkRequest = new XMLHttpRequest();
        //
        // DEVELOPER NOTE:  These properties are for demonstration purposes only so the Sample App can get information about what is happening in the processor.
        // In the code in your own App, you can pass around signals, flags, intermediates, and results however you would like.

      
        //
        this.success = false;
        this.sampleAppControllerReference = sampleAppControllerReference;
        //
        // Part 1:  Starting the FaceTec Session
        //
        var _this = this;

        var parameters = {
            externalDatabaseRefID: this.sampleAppControllerReference.getLatestEnrollmentIdentifier(),
            groupName: this.sampleAppControllerReference.getGroupName(),
            minMatchLevel: 4
        };
        //
        // Part 5:  Make the Networking Call to Your Servers.  Below is just example code, you are free to customize based on how your own API works.
        //
        this.latestNetworkRequest = new XMLHttpRequest();
        this.latestNetworkRequest.open("POST", Config.BaseURL + "/3d-db/search");
        this.latestNetworkRequest.setRequestHeader("Content-Type", "application/json");
        this.latestNetworkRequest.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);
        this.latestNetworkRequest.onreadystatechange = function () {
            //
            // Part 6:  In our Sample, we evaluate a boolean response and treat true as success, false as "User Needs to Retry",
            // and handle all other non-nominal responses by cancelling out.  You may have different paradigms in your own API and are free to customize based on these.
            //
            if (_this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
                try {
                    var responseJSON = JSON.parse(_this.latestNetworkRequest.responseText);
                    //
                    // DEVELOPER NOTE:  These properties are for demonstration purposes only so the Sample App can get information about what is happening in the processor.
                    // In the code in your own App, you can pass around signals, flags, intermediates, and results however you would like.
                    //
                    console.log(responseJSON);
                    if (responseJSON.success === true) {
                        // CASE:  Success!  The Authentication was performed and the user matched the previously enrolled user.
                        //
                        // DEVELOPER NOTE:  These properties are for demonstration purposes only so the Sample App can get information about what is happening in the processor.
                        // In the code in your own App, you can pass around signals, flags, intermediates, and results however you would like.
                        //
                        _this.success = true;
                        // Demonstrates dynamically setting the Success Screen Message.
                        if(responseJSON.searchResults.lenght == 0){
                            alert("No se encontraron coincidencias.");
                        }else{
                            alert("Coincidencias: " + JSON.stringify(responseJSON.searchResults));
                        }
                        
                    }
                    else {
                        if(responseJSON.success === false){
                            alert(responseJSON.meta.message);
                        }else{  
                            alert("Ocurrio un error");
                        }
                    }
                    _this.sampleAppControllerReference.onComplete();
                }
                catch (_a) {
                    // CASE:  Parsing the response into JSON failed --> You define your own API contracts with yourself and may choose to do something different here based on the error.  Solid server-side code should ensure you don't get to this case.
                    console.log("Exception while handling API response, cancelling out.");
                }
            }
        };
        this.latestNetworkRequest.onerror = function () {
            // CASE:  Network Request itself is erroring --> You define your own API contracts with yourself and may choose to do something different here based on the error.
            console.log("XHR error, cancelando.");
        };
        //
        // Part 7:  Demonstrates updating the Progress Bar based on the progress event.
        //
        this.latestNetworkRequest.upload.onprogress = function name(event) {
            var progress = event.loaded / event.total;
        };
        //
        // Part 8:  Actually send the request.
        //
        var jsonStringToUpload = JSON.stringify(parameters);
        this.latestNetworkRequest.send(jsonStringToUpload);
        //
        // Part 9:  For better UX, update the User if the upload is taking a while.  You are free to customize and enhance this behavior to your liking.
        //
        setTimeout(function () {
            if (_this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
                return;
            }
        }, 6000);

        // Required parameters:
        // - FaceTecFaceScanProcessor:  A class that implements FaceTecFaceScanProcessor, which handles the FaceScan when the User completes a Session.  In this example, "this" implements the class.
        // - sessionToken:  A valid Session Token you just created by calling your API to get a Session Token from the Server SDK.
        //
        //new FaceTecSDK.FaceTecSession(this, sessionToken);
    }

    //
    // Part 10:  This function gets called after the FaceTec SDK is completely done.  There are no parameters because you have already been passed all data in the processSessionWhileFaceTecSDKWaits function and have already handled all of your own results.
    //
    SearchProcessor.prototype.onFaceTecSDKCompletelyDone = function () {
        //
        // DEVELOPER NOTE:  onFaceTecSDKCompletelyDone() is called after you signal the FaceTec SDK with success() or cancel().
        // Calling a custom function on the Sample App Controller is done for demonstration purposes to show you that here is where you get control back from the FaceTec SDK.
        //
        this.sampleAppControllerReference.onComplete();
    };
    //
    // DEVELOPER NOTE:  This public convenience method is for demonstration purposes only so the Sample App can get information about what is happening in the processor.
    // In your code, you may not even want or need to do this.
    //
    SearchProcessor.prototype.isSuccess = function () {
        return this.success;
    };
    return SearchProcessor;
}());
var SearchProcessor = SearchProcessor;