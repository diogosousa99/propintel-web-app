import { DocumentIcon, TrashIcon, EyeIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import { useMyDocumentsViewModel } from './hooks/use-my-documents-view-model';
import { useMyDocumentsApiActions } from './hooks/use-my-documents-api-actions.hook';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { ModuleTitle } from '../../../components/module-title.component';

function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

function getFileTypeBadge(extension: string) {
    const type = extension.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(type)) {
        return { label: 'Image', color: 'bg-blue-100 text-blue-800' };
    }
    if (['pdf'].includes(type)) {
        return { label: 'PDF', color: 'bg-red-100 text-red-800' };
    }
    if (['doc', 'docx'].includes(type)) {
        return { label: 'Word', color: 'bg-blue-100 text-blue-800' };
    }
    if (['xls', 'xlsx'].includes(type)) {
        return { label: 'Excel', color: 'bg-green-100 text-green-800' };
    }
    return { label: 'Document', color: 'bg-gray-100 text-gray-800' };
}

export default function MyDocuments() {
    const {
        documents,
        selectedDocument,
        deletingDocument,
        isUploadModalOpen,
        selectedFiles,
        properties,
        _setSelectedDocument,
        _setDeletingDocument,
        _setIsUploadModalOpen,
        _setSelectedFiles,
    } = useMyDocumentsViewModel();

    const { isUploadFilesLoading, _handleDeleteDocument, _handleUploadFiles, _handleUpdateProperty } =
        useMyDocumentsApiActions();

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

    if (!documents?.documents.length) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="p-4 rounded-full bg-muted">
                        <DocumentIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">No documents found</h3>
                        <p className="text-sm text-muted-foreground">You haven't uploaded any documents yet.</p>
                    </div>
                    <Button onClick={() => _setIsUploadModalOpen(true)}>
                        <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                        Upload Document
                    </Button>
                </div>

                <Dialog open={isUploadModalOpen} onOpenChange={_setIsUploadModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Documents</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="files">Select files to upload</Label>
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
                                    <Label>Selected files:</Label>
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
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        _setSelectedFiles([]);
                                        _setIsUploadModalOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleUpload}
                                    disabled={selectedFiles.length === 0 || isUploadFilesLoading}
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
        <div className="p-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                <ModuleTitle title="My Documents" subtitle="Manage your documents" />
                <div className="sm:ml-auto">
                    <Button onClick={() => _setIsUploadModalOpen(true)}>
                        <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                        Upload Document
                    </Button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.documents.map((doc) => {
                    const extension = doc.url.split('.').pop() || '';
                    const { label, color } = getFileTypeBadge(extension);

                    return (
                        <Card key={doc.id} className="overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center space-x-2">
                                    <DocumentIcon className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-medium truncate">{doc.name}</span>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${color}`}>{label}</span>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Created on {new Date(doc.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="space-y-1">
                                        <Label htmlFor={`property-${doc.id}`} className="text-xs">
                                            Property
                                        </Label>
                                        <Select
                                            value={doc.propertyId?.toString() || 'none'}
                                            onValueChange={(value) =>
                                                _handleUpdateProperty(doc.id, value === 'none' ? null : Number(value))
                                            }
                                        >
                                            <SelectTrigger id={`property-${doc.id}`} className="h-8">
                                                <SelectValue placeholder="Select property" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                {properties.map((property) => (
                                                    <SelectItem key={property.id} value={property.id.toString()}>
                                                        {property.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" onClick={() => _setSelectedDocument(doc.url)}>
                                    <EyeIcon className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => _setDeletingDocument({ id: doc.id, url: doc.url })}
                                >
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            <Dialog open={isUploadModalOpen} onOpenChange={_setIsUploadModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Documents</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="files">Select files to upload</Label>
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
                                <Label>Selected files:</Label>
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
                            <Button
                                variant="outline"
                                onClick={() => {
                                    _setSelectedFiles([]);
                                    _setIsUploadModalOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0 || isUploadFilesLoading}
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

            <Dialog open={!!selectedDocument} onOpenChange={() => _setSelectedDocument(null)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Document Preview</DialogTitle>
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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
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
        </div>
    );
}
