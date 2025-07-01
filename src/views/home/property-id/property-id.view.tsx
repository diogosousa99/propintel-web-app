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
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 h-full bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
            <ModuleTitle title="Property ID" subtitle="Add a new property" />
            <div className="flex justify-end mb-4 gap-2">
                <Button onClick={() => _setIsUploadModalOpen(true)} className="gap-2">
                    <ArrowUpTrayIcon className="w-4 h-4" />
                    Upload Documents
                </Button>
            </div>
            <Card className="bg-card border shadow-sm">
                <CardContent className="p-4 sm:p-6">
                    <Form {...propertyIdForm}>
                        <form onSubmit={propertyIdForm.handleSubmit(_handleCreateProperty)} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={propertyIdForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Name *</FormLabel>
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
                                            <FormLabel className="text-foreground">Localization *</FormLabel>
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
                                            <FormLabel className="text-foreground">Acquisition Value *</FormLabel>
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
                                            <FormLabel className="text-foreground">Tax ID *</FormLabel>
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
                                            <FormLabel className="text-foreground">Land Registry Article *</FormLabel>
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
                                            <FormLabel className="text-foreground">Price *</FormLabel>
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
                                            <FormLabel className="text-foreground">Stamp Duty *</FormLabel>
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
                                            <FormLabel className="text-foreground">Deed Expenses *</FormLabel>
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
                                            <FormLabel className="text-foreground">IMT Paid *</FormLabel>
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
                                            <FormLabel className="text-foreground">Acquisition Date *</FormLabel>
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
                                            <FormLabel className="text-foreground">Typology *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select typology" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="T1">T1</SelectItem>
                                                    <SelectItem value="T2">T2</SelectItem>
                                                    <SelectItem value="T3">T3</SelectItem>
                                                    <SelectItem value="T4">T4</SelectItem>
                                                    <SelectItem value="T5">T5</SelectItem>
                                                    <SelectItem value="T6">T6</SelectItem>
                                                    <SelectItem value="T7">T7</SelectItem>
                                                    <SelectItem value="T8">T8</SelectItem>
                                                    <SelectItem value="T9">T9</SelectItem>
                                                    <SelectItem value="T10">T10</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="affectation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Affectation *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select affectation" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Rental">Rental</SelectItem>
                                                    <SelectItem value="Trading">Trading</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Category *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                                    <SelectItem value="House">House</SelectItem>
                                                    <SelectItem value="Villa">Villa</SelectItem>
                                                    <SelectItem value="Land">Land</SelectItem>
                                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                                    <SelectItem value="Office">Office</SelectItem>
                                                    <SelectItem value="Warehouse">Warehouse</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Area (m²) *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="bedrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Bedrooms *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="bathrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Bathrooms *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="parking"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Parking *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="elevator"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Elevator *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select elevator" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Yes">Yes</SelectItem>
                                                    <SelectItem value="No">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="condition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Condition *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select condition" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Good">Good</SelectItem>
                                                    <SelectItem value="Fair">Fair</SelectItem>
                                                    <SelectItem value="Poor">Poor</SelectItem>
                                                    <SelectItem value="To Renovate">To Renovate</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="energyRating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Energy Rating *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select energy rating" />
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
                                    name="yearBuilt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Year Built *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="floor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Floor *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="totalFloors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Total Floors *</FormLabel>
                                            <FormControl>
                                                <Input type="text" inputMode="numeric" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={propertyIdForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel className="text-foreground">Description</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={isCreatePropertyLoading}>
                                    {isCreatePropertyLoading ? (
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                    ) : null}
                                    Create Property
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Dialog open={isUploadModalOpen} onOpenChange={_setIsUploadModalOpen}>
                <DialogContent className="bg-card border shadow-sm">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Upload Documents</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Upload documents to process and extract property information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Select Documents</label>
                            <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(e) => _setSelectedFiles(Array.from(e.target.files || []))}
                                className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                            />
                        </div>
                        {selectedFiles.length > 0 && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Selected Files:</label>
                                <ul className="space-y-1">
                                    {selectedFiles.map((file, index) => (
                                        <li key={index} className="text-sm text-muted-foreground">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => _setIsUploadModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={_handleUploadFiles}
                                disabled={isUploadFilesLoading || selectedFiles.length === 0}
                            >
                                {isUploadFilesLoading ? (
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                ) : null}
                                Upload
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PropertyId;
