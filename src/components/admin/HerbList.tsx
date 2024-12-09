import React, { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Edit2, Trash2, ChevronUp, ChevronDown, Search, Loader2 } from 'lucide-react';
import type { Herb } from '../../types/herb';

interface HerbListProps {
  herbs: Herb[];
  onEdit: (herb: Herb) => void;
  onDelete: (herb: Herb) => void;
  isLoading?: boolean;
}

type SortField = 'common_name' | 'scientific_name';
type SortDirection = 'asc' | 'desc';

export function HerbList({ herbs, onEdit, onDelete, isLoading = false }: HerbListProps) {
  const [selectedHerbs, setSelectedHerbs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('common_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedHerbs = useMemo(() => {
    return herbs
      .filter((herb) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          herb.common_name.toLowerCase().includes(searchLower) ||
          herb.scientific_name.toLowerCase().includes(searchLower) ||
          herb.traditional_uses.some((use) => use.toLowerCase().includes(searchLower))
        );
      })
      .sort((a, b) => {
        const compareValue = sortDirection === 'asc' ? 1 : -1;
        return a[sortField] > b[sortField] ? compareValue : -compareValue;
      });
  }, [herbs, searchQuery, sortField, sortDirection]);

  const paginatedHerbs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedHerbs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedHerbs, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedHerbs.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedHerbs.size === paginatedHerbs.length) {
      setSelectedHerbs(new Set());
    } else {
      setSelectedHerbs(new Set(paginatedHerbs.map((herb) => herb.id)));
    }
  };

  const toggleSelect = (herbId: string) => {
    const newSelected = new Set(selectedHerbs);
    if (newSelected.has(herbId)) {
      newSelected.delete(herbId);
    } else {
      newSelected.add(herbId);
    }
    setSelectedHerbs(newSelected);
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedHerbs.size} herbs?`)) {
      const errors: string[] = [];

      for (const herbId of selectedHerbs) {
        const herb = herbs.find((h) => h.id === herbId);
        if (herb) {
          try {
            await onDelete(herb);
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            errors.push(`Failed to delete ${herb.common_name}: ${errorMessage}`);
          }
        }
      }

      if (errors.length > 0) {
        // Assuming toast.error is defined elsewhere in the code
        toast.error(
          <div>
            <p>Some herbs could not be deleted:</p>
            <ul className="mt-2 list-disc pl-4">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        );
      }

      setSelectedHerbs(new Set());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search herbs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {selectedHerbs.size > 0 && (
          <button
            onClick={handleBulkDelete}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedHerbs.size})
              </>
            )}
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedHerbs.size === paginatedHerbs.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('common_name')}
              >
                <div className="flex items-center">
                  Herb
                  {sortField === 'common_name' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('scientific_name')}
              >
                <div className="flex items-center">
                  Scientific Name
                  {sortField === 'scientific_name' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uses
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedHerbs.map((herb) => (
              <tr key={herb.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedHerbs.has(herb.id)}
                    onChange={() => toggleSelect(herb.id)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    {herb.images?.fresh && (
                      <img
                        src={herb.images.fresh}
                        alt={herb.common_name}
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{herb.common_name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm italic text-gray-500">{herb.scientific_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {herb.traditional_uses.slice(0, 2).map((use, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                      >
                        {use}
                      </span>
                    ))}
                    {herb.traditional_uses.length > 2 && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        +{herb.traditional_uses.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(herb)}
                    disabled={isLoading}
                    className="text-primary-600 hover:text-primary-900 mr-3 p-2 rounded-full hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Edit ${herb.common_name}`}
                    title={`Edit ${herb.common_name}`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Edit2 className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(herb)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Delete ${herb.common_name}`}
                    title={`Delete ${herb.common_name}`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedHerbs.length)}
                </span>{' '}
                of <span className="font-medium">{filteredAndSortedHerbs.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}