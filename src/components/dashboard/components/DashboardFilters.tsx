/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';

const DashboardFilters = ({
    filters,
    updateFilter,
    resetFilters,
    showFilters,
    setShowFilters,
    viewMode,
    setViewMode,
}: any) => (
    <div className="bg-white p-4 rounded shadow border mx-4">
        <div className="flex flex-col space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search listings..."
                    value={filters.searchTerm}
                    onChange={(e) => updateFilter('searchTerm', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                </button>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 rounded ${viewMode === 'table' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <List className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Grid className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="flex flex-col space-y-2">
                    <button onClick={resetFilters} className="text-sm text-gray-600 hover:text-gray-900">
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default DashboardFilters;
