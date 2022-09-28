import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/react";
import { UserPhoto } from "../../utils/photoStorage"
import PhotoItem from "./PhotoItem";

interface PhotoListProps {
  photos: UserPhoto[];
  onClickPhoto: (photo: UserPhoto) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, onClickPhoto }) => {
  return (
    <>
      {/* Grid component ref: https://ionicframework.com/docs/api/grid */}
      <IonGrid>
        <IonRow>
          {photos.map((photo) => (
            <PhotoItem photo={photo} onClickPhoto={onClickPhoto}/>
          ))}
        </IonRow>
      </IonGrid>
    </>
  );
};

export default PhotoList;
