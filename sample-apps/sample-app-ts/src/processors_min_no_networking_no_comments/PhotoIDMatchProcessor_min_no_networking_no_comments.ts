// Welcome to the skeleton code for performing the 3D Liveness + Photo ID Match process.
// This file removes ALL comment annotations, as well as networking calls.

// NOTE: This example DOES NOT perform a Liveness Check.  To perform the Liveness Check, you need to actually make an API call.
// Please see the LivenessCheckProcessor file for a complete demonstration using the FaceTec Testing API.

import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK";
import type { FaceTecSessionResult, FaceTecFaceScanResultCallback, FaceTecIDScanResult, FaceTecIDScanResultCallback, FaceTecIDScanProcessor } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi";

export class PhotoIDMatchProcessor implements FaceTecIDScanProcessor {
  constructor(sessionToken: string, enrollmentIdentifier: string) {
    new FaceTecSDK.FaceTecSession(this, sessionToken);
  }

  public processSessionResultWhileFaceTecSDKWaits(sessionResult: FaceTecSessionResult, faceScanResultCallback: FaceTecFaceScanResultCallback) {
    if (sessionResult.status !== FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully) {
      faceScanResultCallback.cancel();
      return;
    }

    var parameters = {
      faceScan: sessionResult.faceScan,
      auditTrailImage: sessionResult.auditTrail[0],
      lowQualityAuditTrailImage: sessionResult.lowQualityAuditTrail[0],
      enrollmentIdentifier: ... // enrollmentIdentifier that you pick, or could be created in your server code
    };

    // Call Your API Here and handle results here.
  }

  public processIDScanResultWhileFaceTecSDKWaits(idScanResult: FaceTecIDScanResult, idScanResultCallback: FaceTecIDScanResultCallback) {
    if (idScanResult.status !== FaceTecSDK.FaceTecIDScanStatus.Success) {
      idScanResultCallback.cancel();
      return;
    }

    var parameters = {
      idScan: idScanResult.idScan,
      idScanFrontImage: idScanResult.frontImages[0],
      minMatchLevel: 3,
      enrollmentIdentifier: ... // enrollmentIdentifier that you pick, or could be created in your server code
    }

    if(idScanResult.backImages[0]) {
      parameters.idScanBackImage = idScanResult.backImages[0];
    }

    // Call Your API Here and handle results here.
  }

  public onFaceTecSDKCompletelyDone() {
    // Entrypoint where FaceTec SDKs are done and you can proceed.
  }
}
