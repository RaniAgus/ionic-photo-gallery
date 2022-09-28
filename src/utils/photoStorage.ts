import { Photo } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem, WriteFileResult } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { isPlatform } from "@ionic/core";

export const PHOTO_STORAGE = 'photos';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const base64FromFileSystem = async (path: string): Promise<string> => {
  const file = await Filesystem.readFile({ path });
  return file.data;
}

const base64FromWebPath = async (webPath: string): Promise<string> => {
  const response = await fetch(webPath);
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

export const createUserPhotoFromSavedFile = (savedFile: WriteFileResult): UserPhoto => {
  // Display the new image by rewriting the 'file://' path to HTTP
  // Details: https://ionicframework.com/docs/building/webview#file-protocol
  return {
    filepath: savedFile.uri,
    webviewPath: Capacitor.convertFileSrc(savedFile.uri),
  };
}

export const createUserPhotoFromMemory = (photo: Photo, fileName: string): UserPhoto => {
  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
}

export const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
  // 'hybrid' detecta si está corriendo sobre Cordova o Capacitor
  const base64Data = isPlatform('hybrid')
    ? await base64FromFileSystem(photo.path!)
    : await base64FromWebPath(photo.webPath!);

  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  // Si estoy en web no necesito el archivo guardado porque la imagen ya está
  // cargada en memoria
  return isPlatform('hybrid')
    ? createUserPhotoFromSavedFile(savedFile)
    : createUserPhotoFromMemory(photo, fileName);
}

export const loadWebviewPathFromPhoto = async (photo: UserPhoto): Promise<UserPhoto> => {
  const file = await Filesystem.readFile({
    path: photo.filepath,
    directory: Directory.Data,
  });

  return {
    filepath: photo.filepath,
    webviewPath: `data:image/jpeg;base64,${file.data}`,
  };
}

export const loadSaved = async (): Promise<UserPhoto[]> => {
  const { value } = await Preferences.get({ key: PHOTO_STORAGE });
  const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];

  // En mobile vamos a poder usar la ruta desde el filesystem
  // directamente en el image tag `<img src="..."/>`
  return isPlatform('hybrid')
    ? photosInPreferences
  // En cambio, en la web tenemos que leer la imagen en formato base64, porque
  // la API de Ionic los guarda de esa forma usando IndexedDB
  // Ref: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
    : Promise.all(photosInPreferences.map(loadWebviewPathFromPhoto));
}

export const deletePhotoFromFilesystem = async (photo: UserPhoto): Promise<void> => {
  const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
  await Filesystem.deleteFile({
    path: filename,
    directory: Directory.Data,
  });
}
