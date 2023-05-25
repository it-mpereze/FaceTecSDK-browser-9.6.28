// Welcome to the skeleton code for performing 3D Liveness Checks + Storage in a Database (Enrollment).
// This file removes ALL comment annotations, as well as networking calls.

// NOTE: This example DOES NOT perform a Liveness Check.  To perform the Liveness Check, you need to actually make an API call.
// Please see the LivenessCheckProcessor file for a complete demonstration using the FaceTec Testing API.

import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK.js";
import type { FaceTecSessionResult, FaceTecFaceScanResultCallback, FaceTecFaceScanProcessor } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi.js";

export class EnrollmentProcessor implements FaceTecFaceScanProcessor {
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
      enrollmentIdentifier: ... // enrollmentIdentifier that you pick, or could be created in your server code
    };

    // Call Your API Here and handle results here.
  }

  public onFaceTecSDKCompletelyDone() {
    // Entrypoint where FaceTec SDKs are done and you can proceed.
  }
}
