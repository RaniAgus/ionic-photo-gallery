import { Photo } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";

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
