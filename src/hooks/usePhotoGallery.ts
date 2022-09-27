import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async () => {
    // Notice the magic here: there's no platform-specific code (web, iOS, or
    // Android)! The Capacitor Camera plugin abstracts that away for us, leaving
    // just one method call.
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const newPhoto = {
      filepath: `${new Date().getTime()}.jpeg`,
      webviewPath: photo.webPath
    };

    setPhotos((p): UserPhoto[] => [...p, newPhoto]);
  }

  return { photos, takePhoto };
};

export default usePhotoGallery
