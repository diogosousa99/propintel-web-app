import { ModuleTitle, Pagination, SortIcon } from '@components';
import { useMyPropertiesViewModel } from './hooks';
import { useNavigate } from 'react-router-dom';

export default function MyPropertiesList() {
    const navigate = useNavigate();

    const { data, pagination, sorting, search } = useMyPropertiesViewModel();

    const getCurrentSort = (field: string) => {
        return sorting.sorting.find((s) => s.id === field);
    };

    const handleSort = (field: string) => {
        const current = getCurrentSort(field);

        if (!current) {
            sorting._setSorting([{ id: field, desc: false }]);
        } else if (!current.desc) {
            sorting._setSorting([{ id: field, desc: true }]);
        } else {
            sorting._setSorting([]);
        }
    };

    const renderSortIcon = (field: string) => {
        const current = getCurrentSort(field);
        const isSorted = Boolean(current);
        const isAsc = isSorted && !current!.desc;
        const isDesc = isSorted && current!.desc;

        return <SortIcon direction={isAsc ? 'asc' : isDesc ? 'desc' : undefined} />;
    };

    return (
        <div className="flex flex-col gap-6 px-12 py-22 h-full">
            <div className="flex">
                <ModuleTitle title="My Properties" subtitle="List of added properties" />
                <input
                    className="input input-bordered w-full max-w-xs ml-auto"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => search._setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table overflow-auto min-w-full">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')} className="cursor-pointer w-1/4">
                                Name {renderSortIcon('name')}
                            </th>
                            <th onClick={() => handleSort('category')} className="cursor-pointer w-1/4">
                                Category {renderSortIcon('category')}
                            </th>
                            <th onClick={() => handleSort('localization')} className="cursor-pointer w-1/4">
                                Localization {renderSortIcon('localization')}
                            </th>
                            <th onClick={() => handleSort('createdAt')} className="cursor-pointer w-1/4">
                                Created At {renderSortIcon('createdAt')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.results?.map((property) => (
                            <tr
                                key={property.id}
                                className="hover:bg-base-200 hover:cursor-pointer transition-colors duration-200"
                                onClick={() => navigate(`/home/my-properties/${property.id}/expenses`)}
                            >
                                <td>{property.name}</td>
                                <td>{property.category}</td>
                                <td>{property.localization}</td>
                                <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={pagination.page}
                _onChangePage={pagination._setPage}
                pageRows={pagination.rows}
                pagesByGroup={10}
                totalRows={data?.total || 0}
            />
        </div>
    );
}
