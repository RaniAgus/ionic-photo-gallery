import { camera, close, trash } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonImg,
  IonCol,
  IonActionSheet,
} from '@ionic/react';
import usePhotoGallery from '../hooks/usePhotoGallery';
import './Tab2.css';
import { useState } from 'react';
import { UserPhoto } from '../utils/photoStorage';

const Tab2: React.FC = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Grid component ref: https://ionicframework.com/docs/api/grid */}
        <IonGrid>
          <IonRow>
            {photos.map((photo) => (
              <IonCol size='6' key={photo.filepath}>
                <IonImg src={photo.webviewPath} onClick={() => setPhotoToDelete(photo)}/>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {/* Floating Action Button ref: https://ionicframework.com/docs/api/fab */}
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        {/* Action Sheet ref: https://ionicframework.com/docs/api/action-sheet */}
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
