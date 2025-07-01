import { DocumentIcon, TrashIcon, EyeIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../../../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../../../../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../../../components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../../../../../../components/ui/alert-dialog';
import { usePropertyDocumentsViewModel } from './hooks/use-property-documents-view-model';
import { usePropertyDocumentsApiActions } from './hooks/use-property-documents-api-actions';
import { Input } from '../../../../../../components/ui/input';
import { Label } from '../../../../../../components/ui/label';

function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

function getFileTypeBadge(extension: string) {
    const type = extension.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(type)) {
        return { label: 'Image', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' };
    }
    if (['pdf'].includes(type)) {
        return { label: 'PDF', color: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' };
    }
    if (['doc', 'docx'].includes(type)) {
        return { label: 'Word', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' };
    }
    if (['xls', 'xlsx'].includes(type)) {
        return { label: 'Excel', color: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' };
    }
    return { label: 'Document', color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400' };
}

export default function PropertyDocuments() {
    const {
        documents,
        selectedDocument,
        deletingDocument,
        isUploadModalOpen,
        selectedFiles,
        _setSelectedDocument,
        _setDeletingDocument,
        _setIsUploadModalOpen,
        _setSelectedFiles,
    } = usePropertyDocumentsViewModel();

    const { isUploadFilesLoading, _handleDeleteDocument, _handleUploadFiles } = usePropertyDocumentsApiActions();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            _setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            _handleUploadFiles(selectedFiles);
            _setSelectedFiles([]);
            _setIsUploadModalOpen(false);
        }
    };

    const handleOpenUploadModal = () => {
        console.log('Opening upload modal');
        _setIsUploadModalOpen(true);
    };

    const handleCloseUploadModal = () => {
        console.log('Closing upload modal');
        _setIsUploadModalOpen(false);
        _setSelectedFiles([]);
    };

    if (!documents?.documents?.length) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="p-4 rounded-full bg-muted">
                        <DocumentIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground">No documents found</h3>
                        <p className="text-sm text-muted-foreground">This property doesn't have any documents yet.</p>
                    </div>
                    <Button onClick={handleOpenUploadModal} type="button">
                        <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                        Upload Document
                    </Button>
                </div>

                <Dialog open={isUploadModalOpen} onOpenChange={handleCloseUploadModal}>
                    <DialogContent className="bg-card border shadow-sm">
                        <DialogHeader>
                            <DialogTitle className="text-foreground">Upload Documents</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="files" className="text-foreground">
                                    Select files to upload
                                </Label>
                                <Input
                                    id="files"
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                                />
                            </div>
                            {selectedFiles.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="text-foreground">Selected files:</Label>
                                    <ul className="list-disc list-inside">
                                        {selectedFiles.map((file, index) => (
                                            <li key={index} className="text-sm text-muted-foreground">
                                                {file.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={handleCloseUploadModal} type="button">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleUpload}
                                    disabled={selectedFiles.length === 0 || isUploadFilesLoading}
                                    type="button"
                                >
                                    {isUploadFilesLoading ? (
                                        <>Uploading...</>
                                    ) : (
                                        <>
                                            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                                            Upload
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={handleOpenUploadModal} type="button">
                    <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                    Upload Document
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.documents.map((doc) => {
                    const extension = doc.url.split('.').pop() || '';
                    const { label, color } = getFileTypeBadge(extension);

                    return (
                        <Card key={doc.id} className="overflow-hidden bg-card border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center space-x-2">
                                    <DocumentIcon className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-medium truncate text-foreground">{doc.name}</span>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${color}`}>{label}</span>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Created on {new Date(doc.createdAt).toLocaleDateString()}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => _setSelectedDocument(doc.url)}
                                    type="button"
                                >
                                    <EyeIcon className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => _setDeletingDocument({ id: doc.id, url: doc.url })}
                                    type="button"
                                >
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            <Dialog open={!!selectedDocument} onOpenChange={() => _setSelectedDocument(null)}>
                <DialogContent className="max-w-4xl bg-card border shadow-sm">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Document Preview</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        {selectedDocument && isImageUrl(selectedDocument) ? (
                            <img src={selectedDocument} alt="Document preview" className="w-full h-auto rounded-lg" />
                        ) : (
                            <iframe
                                src={selectedDocument || ''}
                                className="w-full h-[600px] rounded-lg"
                                title="Document preview"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deletingDocument} onOpenChange={() => _setDeletingDocument(null)}>
                <AlertDialogContent className="bg-card border shadow-sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                            This action cannot be undone. This will permanently delete the document.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (deletingDocument) {
                                    _handleDeleteDocument(deletingDocument.id, deletingDocument.url);
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Upload Modal for when documents exist */}
            <Dialog open={isUploadModalOpen} onOpenChange={handleCloseUploadModal}>
                <DialogContent className="bg-card border shadow-sm">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Upload Documents</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="files-upload" className="text-foreground">
                                Select files to upload
                            </Label>
                            <Input
                                id="files-upload"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                            />
                        </div>
                        {selectedFiles.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-foreground">Selected files:</Label>
                                <ul className="list-disc list-inside">
                                    {selectedFiles.map((file, index) => (
                                        <li key={index} className="text-sm text-muted-foreground">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleCloseUploadModal} type="button">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0 || isUploadFilesLoading}
                                type="button"
                            >
                                {isUploadFilesLoading ? (
                                    <>Uploading...</>
                                ) : (
                                    <>
                                        <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                                        Upload
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
