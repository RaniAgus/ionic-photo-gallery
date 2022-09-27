import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import { UserPhoto, savePicture } from '../utils/filesystem';

const PHOTO_STORAGE = 'photos';

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

    const fileName = `${new Date().getTime()}.jpeg`;
    const savedFileImage = await savePicture(photo, fileName);

    setPhotos((oldPhotos): UserPhoto[] => {
      const newPhotos = [savedFileImage, ...oldPhotos];
      Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos)});
      return newPhotos;
    });
  }

  return { photos, takePhoto };
};

export default usePhotoGallery;
