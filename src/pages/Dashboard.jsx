import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import Header from '../components/Header';
import http from '../api/http';

export default function Dashboard() {
    const [files, setFiles] = useState({});
    const [notification, setNotification] = useState(null);

    const loadFiles = async () => {
        try {
        const { data } = await http.get('/files');

        setFiles(JSON.parse(JSON.stringify(data)));

        } catch (error) {
        setNotification({ type: 'error', message: 'Failed to load files.' });
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    const showNotification = (type, message) => {
        setNotification({ type, message });
    };

    const handleUploadSuccess = (msg) => {
        showNotification('success', msg);
        loadFiles();
    };

    const handleDeleteSuccess = (msg) => {
        showNotification('success', msg);
        loadFiles();
    };

    return (
        <div className="min-h-screen bg-gray-100">
        <Header />

        {notification && (
            <p
            className={`max-w-3xl mx-auto text-sm px-3 py-2 mb-4 rounded border ${
                notification.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
            >
            {notification.message}
            </p>
        )}

        <div className="max-w-3xl mx-auto space-y-8">
            <FileUpload
            onSuccess={handleUploadSuccess}
            onError={(msg) => showNotification('error', msg)}
            />

            <FileList
            files={files}
            onDeleteSuccess={handleDeleteSuccess}
            />
        </div>
        </div>
    );
}
