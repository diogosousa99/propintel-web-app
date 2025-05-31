import { ModuleTitle } from '@components';
import { DocumentIcon, TrashIcon, XMarkIcon, EyeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useGetUserDocumentsQuery } from '@store';

function getFileTypeBadge(name: string) {
    const ext = name.split('.').pop()?.toLowerCase();
    if (!ext) return null;
    let color = 'badge-neutral';
    if (ext === 'pdf') color = 'badge-error';
    if (['jpg', 'jpeg', 'png'].includes(ext)) color = 'badge-info';
    return <span className={`badge ${color} badge-sm font-medium`}>{ext.toUpperCase()}</span>;
}

export default function MyDocuments() {
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
    const { data: documents, isLoading } = useGetUserDocumentsQuery();

    const handleDeleteDocument = async (url: string) => {
        // TODO: Implement delete functionality
        console.log('Delete document:', url);
    };

    const isImage = (url: string) => {
        return url.match(/\.(jpg|jpeg|png|gif)$/i);
    };

    const handleViewDocument = (url: string) => {
        setSelectedDocument(url);
        const modal = document.getElementById('document_modal') as HTMLDialogElement;
        modal?.showModal();
    };

    return (
        <div className="flex flex-col gap-6 px-12 py-22 h-full">
            <ModuleTitle title="My Documents" subtitle="View and manage your documents" />

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents?.documents.map((doc) => (
                        <div key={doc.url} className="bg-base-100 rounded-xl shadow border p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-3 rounded-lg flex items-center justify-center">
                                    <DocumentIcon className="h-7 w-7 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-base line-clamp-1">{doc.name}</span>
                                        {getFileTypeBadge(doc.name)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-base-content/60">
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="btn btn-outline btn-sm flex-1 flex gap-2 items-center justify-center"
                                    onClick={() => handleViewDocument(doc.url)}
                                >
                                    <EyeIcon className="h-4 w-4" />
                                    View
                                </button>
                                <button
                                    className="btn btn-sm btn-ghost btn-square text-error"
                                    onClick={() => handleDeleteDocument(doc.url)}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Document Preview Modal */}
            <dialog id="document_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </form>
                    {selectedDocument && (
                        <div className="mt-4">
                            {isImage(selectedDocument) ? (
                                <img
                                    src={selectedDocument}
                                    alt="Document preview"
                                    className="w-full h-auto rounded-lg"
                                />
                            ) : (
                                <iframe
                                    src={selectedDocument}
                                    className="w-full h-[80vh] rounded-lg"
                                    title="Document preview"
                                />
                            )}
                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
