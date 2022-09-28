import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

interface ActionButtonProps {
  icon: string;
  onClick: () => void;
}

const AppActionButton: React.FC<ActionButtonProps> = ({ icon, onClick }) => {
  return (
    <>
      {/* Floating Action Button ref: https://ionicframework.com/docs/api/fab */}
      <IonFab vertical='bottom' horizontal='center' slot='fixed'>
        <IonFabButton onClick={onClick}>
          <IonIcon icon={icon}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  )
}

export default AppActionButton
