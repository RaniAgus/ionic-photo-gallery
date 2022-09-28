import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useEffect, useState } from 'react';
import { PHOTO_STORAGE, UserPhoto, savePicture, loadSaved, deletePhotoFromFilesystem } from '../utils/photoStorage';

const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  // useEffect, por defecto, se invoca cada vez que se renderiza un componente
  // a menos que pasemos un array de dependencias como segundo parámetro.
  // En nuestro caso, solo queremos que se llame una única vez, por lo que
  // pasamos un array vacío.
  useEffect(() => {
    loadSaved().then((loadedPhotos) => setPhotos(loadedPhotos));
  }, []);

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

  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // delete photo file from filesystem
    deletePhotoFromFilesystem(photo);

    setPhotos(newPhotos);
  };

  return { photos, takePhoto, deletePhoto };
};

export default usePhotoGallery;
