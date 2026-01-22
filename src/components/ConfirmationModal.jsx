export default function ConfirmationModal({ isOpen, onCancel, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
                <p className="text-gray-800 text-center">{message}</p>
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
