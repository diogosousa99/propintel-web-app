import { ModuleTitle } from '@components';
import { ArrowUpTrayIcon, PlusIcon, DocumentIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { usePropertyIdViewModel } from './hooks';
import { PROPERTY_ID_FORM_FIELDS } from './constants';
import { inputClassName } from '@helpers';
import { Controller } from 'react-hook-form';
import { UserDocumentsResponse } from '@store';
import { usePropertyIdApiActions } from './test-hooks';

export default function PropertyId() {
    const [acquisitionDate, _setAcquisitionDate] = useState<Date | undefined>();
    const [files, setFiles] = useState<FileList | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const { propertyIdForm } = usePropertyIdViewModel();

    const {
        isUploadFilesLoading,
        isCreatePropertyLoading,
        _handleCreateProperty,
        handleProcessDocument,
        isLoadingDocuments,
        userDocuments,
        _handleUploadFiles,
    } = usePropertyIdApiActions();

    const { register, formState, reset, handleSubmit, setValue } = propertyIdForm;

    const { errors } = formState;

    const handleProcessExistingDocument = async (fileUrl: string) => {
        setIsProcessing(true);
        const modal = document.getElementById('my_modal_3')?.closest('dialog');
        if (modal) {
            (modal as HTMLDialogElement).close();
        }

        const fields = await handleProcessDocument(fileUrl);
        if (fields) {
            setValue(PROPERTY_ID_FORM_FIELDS.typology, fields.typology);
            setValue(PROPERTY_ID_FORM_FIELDS.fraction, fields.fraction);
            setValue(PROPERTY_ID_FORM_FIELDS.affectation, fields.affectation);
            setValue(PROPERTY_ID_FORM_FIELDS.privateGrossArea, fields.privateGrossArea);
            setValue(PROPERTY_ID_FORM_FIELDS.dependentGrossArea, fields.dependentGrossArea);
            setValue(PROPERTY_ID_FORM_FIELDS.assetValue, fields.assetValue);

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }
        setIsProcessing(false);
    };

    return (
        <>
            <dialog
                id="my_modal_3"
                className="modal"
                onClick={(e) => {
                    const dialog = e.currentTarget;
                    if (e.target === dialog) {
                        dialog.close();
                    }
                }}
            >
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Upload multiple files</h3>
                    <p className="py-4 text-xs">
                        You can upload multiple files at once. The accepted formats are .pdf, .jpg, .jpeg, and .png.
                        <br />
                        The algorithm could not detect every field, if so, you will have to fill them manually.
                    </p>
                    <input
                        type="file"
                        className="file-input w-full"
                        onChange={handleFileChange}
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div className="modal-action">
                        <button
                            className="btn btn-neutral text-white"
                            type="button"
                            onClick={() => {
                                if (files) _handleUploadFiles(Array.from(files), reset);
                            }}
                        >
                            {isUploadFilesLoading ? <span className="loading loading-spinner" /> : null}
                            Upload
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => document.getElementById('my_modal_3')?.closest('dialog')?.close()}
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Documents List */}
                    <div className="divider">Uploaded Documents</div>
                    {isLoadingDocuments ? (
                        <div className="flex justify-center py-4">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                            {userDocuments?.documents.map((doc: UserDocumentsResponse['documents'][0]) => (
                                <div
                                    key={doc.url}
                                    className="card card-compact bg-base-100 hover:bg-base-200 transition-colors cursor-pointer"
                                    onClick={() => handleProcessExistingDocument(doc.url)}
                                >
                                    <div className="card-body flex-row items-center gap-3 p-3">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <DocumentIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <h3 className="card-title text-sm w-full line-clamp-1">{doc.name}</h3>
                                            <p className="text-xs text-base-content/60">
                                                {new Date(doc.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </dialog>

            <div className="flex flex-col gap-6 px-12 py-22 h-full">
                <div className="flex justify-between">
                    <ModuleTitle title="Property ID" subtitle="Add a new property" />
                    <div className="flex gap-4 items-center">
                        {isProcessing ? (
                            <div className="flex items-center gap-2 text-sm text-base-content/60">
                                <span className="loading loading-spinner loading-sm" />
                                Processing document...
                            </div>
                        ) : null}
                        {showSuccess ? (
                            <div className="text-success text-sm">Document processed successfully!</div>
                        ) : null}
                        <button
                            className="btn btn-outline"
                            type="button"
                            onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                        >
                            <ArrowUpTrayIcon height={18} />
                            Upload Files
                        </button>
                        <button className="btn btn-neutral text-white" type="submit">
                            {isCreatePropertyLoading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <PlusIcon height={18} />
                            )}
                            Add
                        </button>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit((data) => {
                        _handleCreateProperty(data);
                    })}
                >
                    <div className="grid grid-cols-2 gap-8">
                        <div className="w-full">
                            <legend className="text-xs pl-2">Name*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.name, errors)}
                                placeholder="Name"
                                {...register(PROPERTY_ID_FORM_FIELDS.name)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.name] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.name]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Localization*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.localization, errors)}
                                placeholder="Localization"
                                {...register(PROPERTY_ID_FORM_FIELDS.localization)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.localization] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.localization]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Acquisition Value (€)*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.acquisitionValue, errors)}
                                placeholder="Acquisition Value"
                                type="number"
                                {...register(PROPERTY_ID_FORM_FIELDS.acquisitionValue)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.acquisitionValue] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.acquisitionValue]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Acquisition Date*</legend>
                            <button
                                popoverTarget="rdp-popover"
                                type="button"
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.acquisitionDate, errors)}
                                style={{ anchorName: '--rdp' } as React.CSSProperties}
                            >
                                {acquisitionDate ? acquisitionDate.toLocaleDateString() : 'Acquisition Date'}
                            </button>
                            <div
                                popover="auto"
                                id="rdp-popover"
                                className="dropdown"
                                style={{ positionAnchor: '--rdp' } as React.CSSProperties}
                            >
                                <Controller
                                    name={PROPERTY_ID_FORM_FIELDS.acquisitionDate}
                                    control={propertyIdForm.control}
                                    render={({ field: { onChange } }) => (
                                        <DayPicker
                                            className="react-day-picker"
                                            mode="single"
                                            captionLayout="dropdown"
                                            selected={acquisitionDate}
                                            onSelect={(date) => {
                                                _setAcquisitionDate(date);
                                                onChange(date?.toISOString());
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            {errors[PROPERTY_ID_FORM_FIELDS.acquisitionDate] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.acquisitionDate]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Typology*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.typology, errors)}
                                placeholder="Typology"
                                {...register(PROPERTY_ID_FORM_FIELDS.typology)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.typology] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.typology]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Fraction*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.fraction, errors)}
                                placeholder="Fraction"
                                {...register(PROPERTY_ID_FORM_FIELDS.fraction)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.fraction] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.fraction]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Affectation*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.affectation, errors)}
                                placeholder="Affectation"
                                {...register(PROPERTY_ID_FORM_FIELDS.affectation)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.affectation] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.affectation]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Category*</legend>
                            <select
                                defaultValue="Energy Certificate"
                                className="select w-full"
                                {...register(PROPERTY_ID_FORM_FIELDS.category)}
                            >
                                <option>On Hold</option>
                                <option>Trading</option>
                                <option>Lease</option>
                            </select>
                            {errors[PROPERTY_ID_FORM_FIELDS.energyCertificate] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.energyCertificate]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Private Gross Area (m2)*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.privateGrossArea, errors)}
                                placeholder="Private Gross Area"
                                type="number"
                                {...register(PROPERTY_ID_FORM_FIELDS.privateGrossArea)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.privateGrossArea] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.privateGrossArea]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Dependent Gross Area (m2)*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.dependentGrossArea, errors)}
                                placeholder="Dependent Gross Area"
                                type="number"
                                {...register(PROPERTY_ID_FORM_FIELDS.dependentGrossArea)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.dependentGrossArea] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.dependentGrossArea]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Garden (m2)</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.garden, errors)}
                                placeholder="Garden"
                                type="number"
                                {...register(PROPERTY_ID_FORM_FIELDS.garden)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.garden] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.garden]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Balcony (m2)</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.balcony, errors)}
                                placeholder="Balcony"
                                type="number"
                                {...register(PROPERTY_ID_FORM_FIELDS.balcony)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.balcony] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.balcony]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Energy Certificate*</legend>
                            <select
                                defaultValue="Energy Certificate"
                                className="select w-full"
                                {...register(PROPERTY_ID_FORM_FIELDS.energyCertificate)}
                            >
                                <option>A+</option>
                                <option>A</option>
                                <option>B</option>
                                <option>B-</option>
                                <option>C</option>
                                <option>D</option>
                                <option>E</option>
                                <option>F</option>
                            </select>
                            {errors[PROPERTY_ID_FORM_FIELDS.energyCertificate] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.energyCertificate]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">Asset Value (€)*</legend>
                            <input
                                className={inputClassName(PROPERTY_ID_FORM_FIELDS.assetValue, errors)}
                                placeholder="Asset Value"
                                type="number"
                                {...register(PROPERTY_ID_FORM_FIELDS.assetValue)}
                            />
                            {errors[PROPERTY_ID_FORM_FIELDS.assetValue] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.assetValue]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <legend className="text-xs pl-2">State*</legend>
                            <select
                                defaultValue="Energy Certificate"
                                className="select w-full"
                                {...register(PROPERTY_ID_FORM_FIELDS.state)}
                            >
                                <option>New</option>
                                <option>Used</option>
                            </select>
                            {errors[PROPERTY_ID_FORM_FIELDS.state] ? (
                                <span className="text-xs text-error">
                                    {errors[PROPERTY_ID_FORM_FIELDS.state]?.message}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
