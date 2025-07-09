/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataStore, CarListing } from '@/components/lib/dataStore';

interface FilterState {
    status: string;
}

interface CarListingContextType {
    listings: CarListing[];
    filteredListings: CarListing[];
    totalPages: number;
    total: number;
    currentPage: number;
    itemsPerPage: number;
    pageSizeOptions: number[];
    filters: FilterState;
    loading: boolean;
    updateFilter: (key: keyof FilterState, value: any) => void;
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (size: number) => void;
    resetFilters: () => void;
    refreshListings: () => void;
    approveListingContext: (id: string) => void;
    rejectListingContext: (id: string) => void;
    updateListingContext: (id: string, updates: Partial<CarListing>) => void;
}

const CarListingContext = createContext<CarListingContextType | null>(null);

const initialFilters: FilterState = {
    status: 'all',
};

export const CarListingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [listings, setListings] = useState<CarListing[]>([]);
    const [filteredListings, setFilteredListings] = useState<CarListing[]>([]);
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const pageSizeOptions = [5, 10, 20, 50, 100].filter(option => option <= total || option === itemsPerPage);

    const refreshListings = () => {
        setLoading(true);
        const result = dataStore.getListings(currentPage, itemsPerPage, filters.status);
        setListings(result.listings);
        setFilteredListings(result.listings);
        setTotalPages(result.totalPages);
        setTotal(result.total);
        setLoading(false);
    };

    const updateFilter = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const resetFilters = () => {
        setFilters(initialFilters);
        setCurrentPage(1);
    };

    const approveListingContext = (id: string) => {
        const result = dataStore.updateListingStatus(id, 'approved', 'admin', 'Admin User');
        if (result) refreshListings();
    };

    const rejectListingContext = (id: string) => {
        const result = dataStore.updateListingStatus(id, 'rejected', 'admin', 'Admin User');
        if (result) refreshListings();
    };

    const updateListingContext = (id: string, updates: Partial<CarListing>) => {
        const result = dataStore.updateListing(id, updates, 'admin', 'Admin User');
        if (result) refreshListings();
    };

    useEffect(() => {
        refreshListings();
    }, [currentPage, itemsPerPage, filters.status]);

    return (
        <CarListingContext.Provider
            value={{
                listings,
                filteredListings,
                totalPages,
                total,
                currentPage,
                itemsPerPage,
                pageSizeOptions,
                filters,
                loading,
                updateFilter,
                setCurrentPage,
                setItemsPerPage,
                resetFilters,
                refreshListings,
                approveListingContext,
                rejectListingContext,
                updateListingContext,
            }}
        >
            {children}
        </CarListingContext.Provider>
    );
};

export const useCarListing = () => {
    const context = useContext(CarListingContext);
    if (!context) {
        throw new Error('useCarListing must be used within a CarListingProvider');
    }
    return context;
};
