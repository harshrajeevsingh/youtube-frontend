import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

export default function CustomModal({
  isOpen,
  onClose,
  title,
  content,
  onAction,
  actionText = 'Confirm',
  closeText = 'Dismiss',
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            {closeText}
          </Button>
          <Button
            color="primary"
            onPress={() => {
              if (onAction) onAction();
              onClose();
            }}
          >
            {actionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
