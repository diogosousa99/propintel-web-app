import { ModuleTitle, SortIcon } from '../../../../components';
import { useMyPropertiesViewModel } from './hooks';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Input } from '../../../../components/ui/input';

type SortableFields = 'name' | 'category' | 'localization' | 'affectation';

export default function MyPropertiesList() {
    const navigate = useNavigate();
    const { data, sorting, _setSorting, search, _setSearch } = useMyPropertiesViewModel();

    const getCurrentSort = (field: SortableFields) => {
        return sorting.find((s) => s.id === field);
    };

    const handleSort = (field: SortableFields) => {
        const current = getCurrentSort(field);

        if (!current) {
            _setSorting([{ id: field, desc: false }]);
        } else if (!current.desc) {
            _setSorting([{ id: field, desc: true }]);
        } else {
            _setSorting([]);
        }
    };

    const renderSortIcon = (field: SortableFields) => {
        const current = getCurrentSort(field);
        const isSorted = Boolean(current);
        const isAsc = isSorted && !current!.desc;
        const isDesc = isSorted && current!.desc;

        return <SortIcon direction={isAsc ? 'asc' : isDesc ? 'desc' : undefined} />;
    };

    return (
        <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:p-12 h-full">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                <ModuleTitle title="My Properties" subtitle="List of added properties" />
                <Input
                    className="w-full sm:w-auto sm:max-w-xs sm:ml-auto"
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => _setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                onClick={() => handleSort('name')}
                                className="cursor-pointer w-1/4 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none whitespace-nowrap"
                            >
                                Name {renderSortIcon('name')}
                            </TableHead>
                            <TableHead
                                onClick={() => handleSort('category')}
                                className="cursor-pointer w-1/4 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none whitespace-nowrap"
                            >
                                Category {renderSortIcon('category')}
                            </TableHead>
                            <TableHead
                                onClick={() => handleSort('localization')}
                                className="cursor-pointer w-1/4 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none whitespace-nowrap"
                            >
                                Localization {renderSortIcon('localization')}
                            </TableHead>
                            <TableHead
                                onClick={() => handleSort('affectation')}
                                className="cursor-pointer w-1/4 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none whitespace-nowrap"
                            >
                                Affectation {renderSortIcon('affectation')}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.results?.map((property) => (
                            <TableRow
                                key={property.id}
                                className="hover:cursor-pointer"
                                onClick={() => navigate(`/home/my-properties/${property.id}/expenses`)}
                            >
                                <TableCell className="font-medium whitespace-nowrap">{property.name}</TableCell>
                                <TableCell className="whitespace-nowrap">{property.category}</TableCell>
                                <TableCell className="whitespace-nowrap">{property.localization}</TableCell>
                                <TableCell className="whitespace-nowrap">{property.affectation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
