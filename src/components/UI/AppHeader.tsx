import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

interface HeaderProps {
  title: string;
}

const AppHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default AppHeader
