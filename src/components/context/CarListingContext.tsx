/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataStore, CarListing } from '@/components/lib/dataStore';

interface FilterState {
    status: string;
    itemsPerPage: number;
    currentPage: number;
    searchTerm: string;
    make: string;
    year: string;
    fuelType: string;
    priceRange: [number, number];
}

interface CarListingContextType {
    listings: CarListing[];
    filteredListings: CarListing[];
    totalPages: number;
    total: number;
    filters: FilterState;
    loading: boolean;
    updateFilter: (key: keyof FilterState, value: any) => void;
    resetFilters: () => void;
    refreshListings: () => void;
    approveListingContext: (id: string) => void;
    rejectListingContext: (id: string) => void;
    updateListingContext: (id: string, updates: Partial<CarListing>) => void;
}

const CarListingContext = createContext<CarListingContextType | null>(null);

const initialFilters: FilterState = {
    status: 'all',
    itemsPerPage: 8,
    currentPage: 1,
    searchTerm: '',
    make: '',
    year: '',
    fuelType: '',
    priceRange: [0, 1000],
};

export const CarListingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [listings, setListings] = useState<CarListing[]>([]);
    const [filteredListings, setFilteredListings] = useState<CarListing[]>([]);
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const refreshListings = () => {
        setLoading(true);
        const result = dataStore.getListings(filters.currentPage, filters.itemsPerPage, filters.status);
        setListings(result.listings);
        applyFilters(result.listings);
        setTotalPages(result.totalPages);
        setTotal(result.total);
        setLoading(false);
    };

    const applyFilters = (listingsToFilter: CarListing[]) => {
        let filtered = listingsToFilter;

        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(listing =>
                listing.title.toLowerCase().includes(term) ||
                listing.make.toLowerCase().includes(term) ||
                listing.model.toLowerCase().includes(term)
            );
        }

        if (filters.make) {
            filtered = filtered.filter(listing => listing.make === filters.make);
        }

        if (filters.year) {
            filtered = filtered.filter(listing => listing.year.toString() === filters.year);
        }

        if (filters.fuelType) {
            filtered = filtered.filter(listing => listing.fuelType === filters.fuelType);
        }

        filtered = filtered.filter(listing =>
            listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]
        );

        setFilteredListings(filtered);
    };

    const updateFilter = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            currentPage: key === 'currentPage' ? value : 1,
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
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
    }, [filters.currentPage, filters.itemsPerPage, filters.status]);

    useEffect(() => {
        applyFilters(listings);
    }, [filters.searchTerm, filters.make, filters.year, filters.fuelType, filters.priceRange, listings]);

    return (
        <CarListingContext.Provider
            value={{
                listings,
                filteredListings,
                totalPages,
                total,
                filters,
                loading,
                updateFilter,
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
