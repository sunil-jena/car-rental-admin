/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Grid, List } from 'lucide-react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

const DashboardFilters = ({
    filters,
    updateFilter,
    resetFilters,
    showFilters,
    viewMode,
    setViewMode,
}: any) => (
    <div className="bg-white p-4 rounded shadow border mx-4">
        <div className="flex items-center justify-between gap-1">
            <div className="w-48">
                <Select
                    value={filters.status}
                    onValueChange={(value) => updateFilter(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded ${viewMode === 'table'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        } cursor-pointer`}
                >
                    <List className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        } cursor-pointer`}
                >
                    <Grid className="h-4 w-4" />
                </button>
            </div>
        </div>

        {showFilters && (
            <div className="flex flex-col space-y-2">
                <button
                    onClick={resetFilters}
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Reset Filters
                </button>
            </div>
        )}
    </div>
);

export default DashboardFilters;
