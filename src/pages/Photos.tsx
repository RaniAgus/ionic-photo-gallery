import { camera } from "ionicons/icons";
import { IonContent, IonPage } from "@ionic/react";
import usePhotoGallery from "../hooks/usePhotoGallery";
import { useState } from "react";
import { UserPhoto } from "../utils/photoStorage";

import "./Photos.css";
import AppHeader from "../components/UI/AppHeader";
import PhotoList from "../components/Photos/PhotoList";
import AppActionButton from "../components/UI/AppActionButton";
import DeleteActionSheet from "../components/UI/DeleteActionSheet";

const Tab2: React.FC = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();

  const handleClickPhoto = (photo: UserPhoto) => {
    setPhotoToDelete(photo);
  };

  const handleDeletePhoto = () => {
    if (photoToDelete) {
      deletePhoto(photoToDelete);
      setPhotoToDelete(undefined);
    }
  }

  const handleDismissDeletePhoto = () => {
    setPhotoToDelete(undefined);
  }

  return (
    <IonPage>
      <AppHeader title="Photo Gallery" />
      <IonContent>
        <PhotoList photos={photos} onClickPhoto={handleClickPhoto} />
        <AppActionButton icon={camera} onClick={takePhoto} />
        <DeleteActionSheet
          isOpen={!!photoToDelete}
          onDelete={handleDeletePhoto}
          onDismiss={handleDismissDeletePhoto}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
