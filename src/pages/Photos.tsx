import { camera, close, trash } from "ionicons/icons";
import { IonContent, IonPage, IonActionSheet } from "@ionic/react";
import usePhotoGallery from "../hooks/usePhotoGallery";
import { useState } from "react";
import { UserPhoto } from "../utils/photoStorage";

import "./Photos.css";
import AppHeader from "../components/UI/AppHeader";
import PhotoList from "../components/Photos/PhotoList";
import AppActionButton from "../components/UI/AppActionButton";

const Tab2: React.FC = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();

  const handleClickPhoto = (photo: UserPhoto) => {
    setPhotoToDelete(photo);
  };

  return (
    <IonPage>
      <AppHeader title="Photo Gallery" />
      <IonContent>
        <PhotoList photos={photos} onClickPhoto={handleClickPhoto} />
        <AppActionButton icon={camera} onClick={takePhoto} />
        {/* Action Sheet ref: https://ionicframework.com/docs/api/action-sheet */}
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
