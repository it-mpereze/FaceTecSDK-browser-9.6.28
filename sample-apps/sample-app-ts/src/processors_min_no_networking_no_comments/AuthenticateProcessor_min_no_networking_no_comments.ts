// Welcome to the skeleton code for performing 3D to 3D Matching.
// This file removes ALL comment annotations, as well as networking calls.

// NOTE: This example DOES NOT perform a Liveness Check.  To perform the Liveness Check, you need to actually make an API call.
// Please see the LivenessCheckProcessor file for a complete demonstration using the FaceTec Testing API.

import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK";
import type { FaceTecSessionResult, FaceTecFaceScanResultCallback, FaceTecFaceScanProcessor } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi";

export class AuthenticateProcessor implements FaceTecFaceScanProcessor {
  constructor(sessionToken: string) {
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
      enrollmentIdentifier: ... // enrollmentIdentifier to Match against.  Likely you will want to just keep this in your server-side code
    };

    // Call Your API Here and handle results here.
  }

  public onFaceTecSDKCompletelyDone() {
    // Entrypoint where FaceTec SDKs are done and you can proceed
  }
}
