import { Photo } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";

export const PHOTO_STORAGE = 'photos';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const base64FromPath = async (path: string): Promise<string> => {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}

export const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
  const base64Data = await base64FromPath(photo.webPath!);
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  // Uso webPath para mostrar la imagen en vez de base64 porque la imagen ya
  // está en memoria
  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
}

export const loadWebviewPathFromPhoto = async (photo: UserPhoto): Promise<UserPhoto> => {
  const file = await Filesystem.readFile({
    path: photo.filepath,
    directory: Directory.Data,
  });

  console.log({ filepath: photo.filepath, data: file.data });

  // En mobile vamos a poder usar la ruta desde el filesystem
  // directamente en el image tag `<img src="..."/>`

  // En cambio, en la web tenemos que leer la imagen en formato base64, porque
  // la API de Ionic los guarda de esa forma usando IndexedDB
  // Ref: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
  return {
    filepath: photo.filepath,
    webviewPath: `data:image/jpeg;base64,${file.data}`,
  };
}

export const loadSaved = async (): Promise<UserPhoto[]> => {
  const { value } = await Preferences.get({ key: PHOTO_STORAGE });
  const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];
  return Promise.all(photosInPreferences.map(loadWebviewPathFromPhoto));
}
