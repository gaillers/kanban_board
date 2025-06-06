type Props = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
};

export const ConfirmDialog = ({
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  confirmColor = 'bg-red-600',
}: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="min-w-[300px] rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <button className="rounded border border-gray-300 px-4 py-2 opacity-75" onClick={onCancel}>
          {cancelText}
        </button>
        <button
          className={`${confirmColor} rounded px-4 py-2 text-white transition hover:bg-red-800`}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);
