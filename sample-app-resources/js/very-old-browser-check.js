(function alertIfOldBrowser() {
  try {
    var testBrowserSupport = new Function("'use strict'; const testConstSupport = 0; var testWorkerSupport = Worker.length; var testWasmSupport = WebAssembly.Module;");
    testBrowserSupport();
  }
  catch(e) {
    // browser doesn't not support const/workers/wasm - cannot run FaceTecSDK
    // call incompatible browser handler here
    alert("Browser not supported: missing basic JS constructs required for FaceTecSDK.js to load.\n\n" + navigator.userAgent);
    window.location.href = window.location.origin;
  }
})();
