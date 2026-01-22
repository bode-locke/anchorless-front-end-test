import { useState, useRef } from 'react';
import http from '../api/http';

export default function FileUpload({ onSuccess, onError }) {
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const resetFileInput = () => {
        setFile(null);
        if (fileInputRef.current) {
        fileInputRef.current.value = '';
        }
    };

    const isValidFileType = (file) => [
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg',
    ].includes(file.type);

    const handleFileChange = (e) => {
        const f = e.target.files[0];

        if (!f) {
        resetFileInput();
        return;
        }

        if (f.size > 4 * 1024 * 1024) {
        const msg = 'The file is too large (max 4 MB).';
        resetFileInput();
        onError?.(msg);
        return;
        }

        if (!isValidFileType(f)) {
        const msg = 'Invalid file type. Allowed: PDF, PNG, JPG.';
        resetFileInput();
        onError?.(msg);
        return;
        }

        setFile(f);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!file) {
        onError?.('Please select a file first.');
        return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        try {
        setLoading(true);
        await http.post('/files/upload', formData);

        onSuccess?.('File uploaded successfully.');

        // ✅ IMPORTANT
        resetFileInput();
        setCategory('');

        } catch (error) {
        const apiMessage = error.response?.data?.message;
        const fieldError = error.response?.data?.errors?.file?.[0];
        onError?.(fieldError || apiMessage || 'Upload failed unexpectedly.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upload a file
            </h3>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        File
                    </label>

                    <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                        <span className="text-sm font-medium">Choose File</span>
                        <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        />
                    </label>

                    {file && (
                        <p className="text-sm text-gray-700 mt-1">
                        Selected: {file.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                        <option value="">Select category</option>
                        <option value="identity">Identity Documents</option>
                        <option value="financial">Financial Documents</option>
                        <option value="supporting">Supporting Documents</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                    >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}
