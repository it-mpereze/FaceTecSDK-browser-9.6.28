// Welcome to the skeleton code for performing the Photo ID Scan process.
// This file removes ALL comment annotations, as well as networking calls.

// NOTE: This example DOES NOT perform a secure Photo ID Scan.  To perform a secure Photo ID Scan, you need to actually make an API call.
// Please see the PhotoIDScanProcessor file for a complete demonstration using the FaceTec Testing API.

import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK";
import type { FaceTecIDScanResult, FaceTecIDScanResultCallback, FaceTecIDScanProcessor } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi";

export class PhotoIDScanProcessor implements FaceTecIDScanProcessor {
  constructor(sessionToken: string, sampleAppControllerReference: any) {
    new FaceTecSDK.FaceTecSession(this, sessionToken);
  }

  public processIDScanResultWhileFaceTecSDKWaits = (idScanResult: FaceTecIDScanResult, idScanResultCallback: FaceTecIDScanResultCallback): void => {
    if(idScanResult.status !== FaceTecSDK.FaceTecIDScanStatus.Success) {
      idScanResultCallback.cancel();
      return;
    }

    var parameters: any = {
      idScan: idScanResult.idScan
    };

    if(idScanResult.frontImages && idScanResult.frontImages[0]) {
      parameters.idScanFrontImage = idScanResult.frontImages[0];
    }

    if(idScanResult.backImages && idScanResult.backImages[0]) {
      parameters.idScanBackImage = idScanResult.backImages[0];
    }

    // Call Your API Here and handle results here.
  };

  public onFaceTecSDKCompletelyDone = (): void => {
    // Entrypoint where FaceTec SDKs are done and you can proceed
  };
}
