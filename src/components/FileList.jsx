import { useState } from 'react';
import http from '../api/http';
import ConfirmationModal from './ConfirmationModal';

export default function FileList({ files, onDeleteSuccess }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);

    const handleDeleteClick = (id, filename) => {
        setFileToDelete({ id, filename });
        setOpenDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await http.delete(`/files/${fileToDelete.id}`);
            onDeleteSuccess('File deleted successfully.');
        } catch (error) {
            onDeleteSuccess('Failed to delete file.');
        } finally {
            setOpenDeleteModal(false);
            setFileToDelete(null);
        }
    };

    const cancelDelete = () => {
        setOpenDeleteModal(false);
        setFileToDelete(null);
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <ConfirmationModal
                isOpen={openDeleteModal}
                message={`Are you sure you want to delete "${fileToDelete?.filename}"?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your files
            </h3>

            {Object.keys(files).length === 0 && (
                <p className="text-sm text-gray-600">No files uploaded yet.</p>
            )}

            <div className="space-y-6">
                {Object.entries(files).map(([category, items]) => (
                <div key={category}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {category.charAt(0).toUpperCase() + category.slice(1) || 'Uncategorized'}
                    </h4>

                    <ul className="divide-y divide-gray-200">
                    {items.map((file) => (
                        <li
                        key={file.id}
                        className="flex items-center justify-between py-2"
                        >
                        <span className="text-sm text-gray-800">
                            {file.filename}
                        </span>
                        <button
                            type="button"
                            onClick={() => handleDeleteClick(file.id, file.filename)}
                            className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                        >
                            Delete
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
        </div>
    );
}
