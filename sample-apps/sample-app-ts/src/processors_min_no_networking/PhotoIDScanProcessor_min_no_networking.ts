// Welcome to the minimized FaceTec Device SDK code to launch Photo ID Scan Sessions and retrieve ID Scans (for further processing)!
// This file removes comment annotations, as well as networking calls,
// in an effort to demonstrate how little code is needed to get the FaceTec Device SDKs to work.

// NOTE: This example DOES NOT perform a secure Photo ID Scan.  To perform a secure Photo ID Scan, you need to actually make an API call.
// Please see the PhotoIDScanProcessor file for a complete demonstration using the FaceTec Testing API.

import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK";
import type { FaceTecIDScanResult, FaceTecIDScanResultCallback, FaceTecIDScanProcessor } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi";

export class PhotoIDScanProcessor implements FaceTecIDScanProcessor {
  constructor(sessionToken: string, sampleAppControllerReference: any) {
    // Core FaceTec Device SDK code that starts the User Session.
    new FaceTecSDK.FaceTecSession(this, sessionToken);
  }

  public processIDScanResultWhileFaceTecSDKWaits = (idScanResult: FaceTecIDScanResult, idScanResultCallback: FaceTecIDScanResultCallback): void => {
    // Normally a User will complete a Session.  This checks to see if there was a cancellation, timeout, or some other non-success case.
    if(idScanResult.status !== FaceTecSDK.FaceTecIDScanStatus.Success) {
      idScanResultCallback.cancel();
      return;
    }

    // IMPORTANT:  FaceTecSDK.FaceTecIDScanStatus.Success DOES NOT mean the Photo ID Scan was Successful.
    // It simply means the User completed the Session.  You still need to perform the Photo ID Scan result checks on your Servers.

    // These are the core parameters
    var parameters: any = {
      idScan: idScanResult.idScan
    };

    //
    // Sending up front and back images are non-essential, but are useful for auditing purposes, and are required in order for the FaceTec Server Dashboard to render properly.
    //
    if(idScanResult.frontImages && idScanResult.frontImages[0]) {
      parameters.idScanFrontImage = idScanResult.frontImages[0];
    }

    if(idScanResult.backImages && idScanResult.backImages[0]) {
      parameters.idScanBackImage = idScanResult.backImages[0];
    }

    // DEVELOPER TODOS:
    // 1.  Call your own API with the above data and pass into the Server SDK
    // 2.  If the Server SDK successfully processes the data, call proceedToNextStep(scanResultBlob), passing in the generated scanResultBlob to the parameter.
    //     If the Session Result object's isCompletelyDone value is true, the ID Scan part of the Session was successful and onFaceTecSDKCompletelyDone() will be called next.
    //     If the Session Result object's isCompletelyDone value is false, the ID Scan Session is continuing to advance through the User Flow, passing back another Session Result once the next step in the User Flow is complete and ready to be processed by the Server SDK.
    // 3.  cancel() is provided in case you detect issues with your own API, such as errors processing and returning the scanResultBlob.
    // 4.  uploadProgress(yourUploadProgressFloat) is provided to control the Progress Bar.

    // idScanResultCallback.proceedToNextStep(scanResultBlob)
    // idScanResultCallback.cancel()
    // idScanResultCallback.uploadProgress(yourUploadProgressFloat)
  };

  public onFaceTecSDKCompletelyDone = (): void => {
    // Entrypoint where FaceTec SDKs are done and you can proceed
  };
}
