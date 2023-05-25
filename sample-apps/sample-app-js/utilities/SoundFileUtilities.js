// Load custom sound files
var SoundFileUtilities = /** @class */ (function () {
    function SoundFileUtilities() {
        // Return the customization object updated with custom sound files
        this.setVocalGuidanceSoundFiles = function (zoomCustomization) {
            zoomCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = PLEASE_FRAME_YOUR_FACE_SOUND_FILE;
            zoomCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = PLEASE_MOVE_CLOSER_SOUND_FILE;
            zoomCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = PLEASE_RETRY_SOUND_FILE;
            zoomCustomization.vocalGuidanceCustomization.uploadingSoundFile = UPLOADING_SOUND_FILE;
            zoomCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = FACESCAN_SUCCESSFUL_SOUND_FILE;
            zoomCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = PLEASE_PRESS_BUTTON_SOUND_FILE;
            return zoomCustomization;
        };
    }
    return SoundFileUtilities;
}());
var SoundFileUtilities = SoundFileUtilities;
