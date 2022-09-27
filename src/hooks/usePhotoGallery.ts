import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const usePhotoGallery = () => {
  const takePhoto = async () => {
    // Notice the magic here: there's no platform-specific code (web, iOS, or
    // Android)! The Capacitor Camera plugin abstracts that away for us, leaving
    // just one method call.
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  return { takePhoto };
};

export default usePhotoGallery
