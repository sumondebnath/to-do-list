import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

export default function ConfirmationModal({
  open,
  title = "Confirm",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onClose}
    >
      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          variant={tone === "danger" ? "danger" : "primary"}
          onClick={() => onConfirm?.()}
          data-autofocus
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
