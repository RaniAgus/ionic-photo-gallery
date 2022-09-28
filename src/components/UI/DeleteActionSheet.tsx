import { IonActionSheet } from "@ionic/react";
import { trash, close } from "ionicons/icons";

interface DeleteActionSheetProps {
  isOpen: boolean;
  onDelete: () => void;
  onDismiss: () => void;
}

const DeleteActionSheet: React.FC<DeleteActionSheetProps> = (
  { isOpen, onDelete, onDismiss }
) => {
  const buttons = [
    {
      text: "Delete",
      role: "destructive",
      icon: trash,
      handler: onDelete,
    },
    {
      text: "Cancel",
      icon: close,
      role: "cancel",
    },
  ];

  return (
    <>
      {/* Action Sheet ref: https://ionicframework.com/docs/api/action-sheet */}
      <IonActionSheet
        isOpen={isOpen}
        buttons={buttons}
        onDidDismiss={onDismiss}
      />
    </>
  )
}

export default DeleteActionSheet
