import { IonCol, IonImg } from "@ionic/react";
import { UserPhoto } from "../../utils/photoStorage";

interface PhotoItemProps {
  photo: UserPhoto;
  onClickPhoto: (photo: UserPhoto) => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, onClickPhoto }) => {
  return (
    <IonCol size='6' key={photo.filepath}>
      <IonImg src={photo.webviewPath} onClick={() => onClickPhoto(photo)}/>
    </IonCol>
  )
}

export default PhotoItem
