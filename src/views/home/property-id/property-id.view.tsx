import { useEffect } from 'react';
import { usePropertyIdViewModel } from './hooks/use-property-id-view-model.hook';
import { ModuleTitle } from '../../../components/module-title.component';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Card, CardContent } from '../../../components/ui/card';
import { DatePicker } from '../../../components/ui/date-picker';
import { usePropertyIdApiActions } from './hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';

const PropertyId = () => {
    const {
        isUploadModalOpen,
        propertyIdForm,
        selectedFiles,
        userDocuments,
        _setIsUploadModalOpen,
        _setSelectedFiles,
    } = usePropertyIdViewModel();

    const {
        isUploadFilesLoading,
        isCreatePropertyLoading,
        isProcessingDocument,
        _handleUploadFiles,
        _handleCreateProperty,
        _handleProcessDocument,
    } = usePropertyIdApiActions();

    useEffect(() => {
        if (isProcessingDocument) {
            toast.loading('Processing document...', { id: 'processing-document' });
        } else {
            toast.dismiss('processing-document');
        }
    }, [isProcessingDocument]);

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 h-full">
            <ModuleTitle title="Property ID" subtitle="Add a new property" />
            <div className="flex justify-end mb-4 gap-2">
                <Button onClick={() => _setIsUploadModalOpen(true)} className="gap-2">
                    <ArrowUpTrayIcon className="w-4 h-4" />
                    Upload Documents
                </Button>
            </div>
            <Card>
                <CardContent className="p-4 sm:p-6">
                    <Form {...propertyIdForm}>
                        <form onSubmit={propertyIdForm.handleSubmit(_handleCreateProperty)} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={propertyIdForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={propertyIdForm.control}
                                    name="localization"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Localization *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={propertyIdForm.control}
                                    name="acquisitionValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Acquisition Value *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="taxId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tax ID *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="landRegistryArticle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Land Registry Article *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="stampDuty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stamp Duty *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="deedExpenses"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deed Expenses *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="imtPaid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>IMT Paid *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="acquisitionDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Acquisition Date *</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    date={field.value ? new Date(field.value) : undefined}
                                                    onSelect={(date) => field.onChange(date?.toISOString())}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="typology"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Typology *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="fraction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fraction *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="affectation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Affectation *</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                                    <SelectItem value="Trading">Trading</SelectItem>
                                                    <SelectItem value="Arrendamento">Arrendamento</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="privateGrossArea"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Private Gross Area *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="dependentGrossArea"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dependent Gross Area *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="garden"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Garden</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="balcony"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Balcony</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="energyCertificate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Energy Certificate</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select energy certificate" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="A+">A+</SelectItem>
                                                    <SelectItem value="A">A</SelectItem>
                                                    <SelectItem value="B">B</SelectItem>
                                                    <SelectItem value="B-">B-</SelectItem>
                                                    <SelectItem value="C">C</SelectItem>
                                                    <SelectItem value="D">D</SelectItem>
                                                    <SelectItem value="E">E</SelectItem>
                                                    <SelectItem value="F">F</SelectItem>
                                                    <SelectItem value="G">G</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="assetValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Asset Value *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select state" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Used">Used</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {propertyIdForm.watch('category') === 'Arrendamento' && (
                                    <FormField
                                        control={propertyIdForm.control}
                                        name="monthlyIncome"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Monthly Income *</FormLabel>
                                                <FormControl>
                                                    <Input type="text" inputMode="numeric" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isCreatePropertyLoading || !propertyIdForm.formState.isValid}
                                    className="w-full sm:w-auto"
                                >
                                    {isCreatePropertyLoading ? (
                                        <div className="animate-spin mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent" />
                                    ) : null}
                                    {isCreatePropertyLoading ? 'Creating...' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Dialog open={isUploadModalOpen} onOpenChange={_setIsUploadModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Documents</DialogTitle>
                        <DialogDescription>
                            Upload property documents to process and extract information automatically.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...propertyIdForm}>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <FormLabel>Select Files</FormLabel>
                                <Input
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => _setSelectedFiles(Array.from(e.target.files ?? []))}
                                />
                            </div>
                            <div>
                                <FormLabel>Uploaded Documents</FormLabel>
                                <div className="space-y-2 max-w-full overflow-x-auto">
                                    {userDocuments?.documents.length ? (
                                        userDocuments.documents.map((doc) => (
                                            <div
                                                key={doc.url}
                                                className="flex items-center justify-between border rounded px-3 py-2 bg-muted/50 w-full"
                                            >
                                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                                    <span className="ellipsis" title={doc.name}>
                                                        {doc.name}
                                                    </span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        _setIsUploadModalOpen(false);
                                                        _handleProcessDocument(doc.url, propertyIdForm.reset);
                                                    }}
                                                    disabled={isProcessingDocument}
                                                >
                                                    Process
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs text-muted-foreground">No documents uploaded yet.</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 items-center">
                                <Button
                                    variant="outline"
                                    onClick={() => _setIsUploadModalOpen(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => _handleUploadFiles(selectedFiles)}
                                    disabled={selectedFiles.length === 0 || isUploadFilesLoading}
                                    className="w-full sm:w-auto"
                                >
                                    {isUploadFilesLoading ? (
                                        <div className="animate-spin mr-2 h-4 w-4 rounded-full border-2 border-primary border-t-transparent" />
                                    ) : null}
                                    {isUploadFilesLoading ? 'Uploading...' : 'Upload'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PropertyId;
