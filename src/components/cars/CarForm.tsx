/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect, FC } from 'react';
import { dataStore, CarListing } from '../lib/dataStore';
import { ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Layout from '../layout/Layout';

const CarForm: FC<CarListing> = ({ ...data }) => {
    // const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth();
    const [listing, setListing] = useState<CarListing | null>(data);
    const [isLoading, setIsLoading] = useState(false);
    const isNewListing = data.id === 'new';

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        year: 2020,
        make: '',
        model: '',
        mileage: 0,
        fuelType: '',
        transmission: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (listing !== null && listing !== undefined) {
            setListing(listing);
            setFormData({
                title: data.title,
                description: data.description,
                price: data.price,
                location: data.location,
                year: data.year,
                make: data.make,
                model: data.model,
                mileage: data.mileage,
                fuelType: data.fuelType,
                transmission: data.transmission,
                imageUrl: data.imageUrl,
            });
        } else {
            toast.error('Listing not found');
            router.back();
        }

    }, [data, router]);

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);
        try {
            const listingData = {
                ...formData,
                price: Number(formData.price),
                year: Number(formData.year),
                mileage: Number(formData.mileage),
                status: 'pending' as const,
                submittedBy: user.email || user.name
            };

            let result;
            if (isNewListing) {
                result = dataStore.createListing(listingData, user.id, user.name);
            } else
                if (data?.id) {
                    result = dataStore.updateListing(data.id, listingData, user.id, user.name);
                }

            if (result) {
                toast.success(`Listing ${isNewListing ? 'created' : 'updated'} successfully!`);
                router.back();
            } else {
                toast.error(`Failed to ${isNewListing ? 'create' : 'update'} listing.`);
            }
        } catch (error) {
            toast.error(`An error occurred while ${isNewListing ? 'creating' : 'updating'} the listing.`);
        } finally {
            setIsLoading(false);
        }
    };

    // Year options
    const yearOptions = Array.from({ length: 25 }, (_, i) => 2024 - i);

    if (!listing && !isNewListing) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-4 md:space-y-6 px-4 md:px-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 self-start"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {isNewListing ? 'Create New Listing' : 'Edit Listing'}
                        </h1>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">
                            {isNewListing ? 'Add a new car rental listing' : 'Update car rental listing details'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
                            <h2 className="text-lg md:text-xl font-semibold mb-4">Listing Details</h2>
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                {isNewListing ? 'Enter the car rental listing information' : 'Update the car rental listing information'}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Enter listing title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Enter listing description"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Day ($)</label>
                                        <input
                                            id="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            id="location"
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            placeholder="City, State"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                        <select
                                            id="year"
                                            value={formData.year}
                                            onChange={(e) => handleInputChange('year', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        >
                                            <option value="">Select year</option>
                                            {yearOptions.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
                                        <select
                                            id="make"
                                            value={formData.make}
                                            onChange={(e) => handleInputChange('make', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        >
                                            <option value="">Select make</option>
                                            <option value="Toyota">Toyota</option>
                                            <option value="BMW">BMW</option>
                                            <option value="Honda">Honda</option>
                                            <option value="Ford">Ford</option>
                                            <option value="Audi">Audi</option>
                                            <option value="Mercedes">Mercedes</option>
                                            <option value="Volkswagen">Volkswagen</option>
                                            <option value="Nissan">Nissan</option>
                                            <option value="Hyundai">Hyundai</option>
                                            <option value="Kia">Kia</option>
                                            <option value="Chevrolet">Chevrolet</option>
                                            <option value="Mazda">Mazda</option>
                                            <option value="Subaru">Subaru</option>
                                            <option value="Lexus">Lexus</option>
                                            <option value="Infiniti">Infiniti</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                        <input
                                            id="model"
                                            type="text"
                                            value={formData.model}
                                            onChange={(e) => handleInputChange('model', e.target.value)}
                                            placeholder="Camry, X5, etc."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage</label>
                                        <input
                                            id="mileage"
                                            type="number"
                                            value={formData.mileage}
                                            onChange={(e) => handleInputChange('mileage', Number(e.target.value))}
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                                        <select
                                            id="fuelType"
                                            value={formData.fuelType}
                                            onChange={(e) => handleInputChange('fuelType', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        >
                                            <option value="">Select fuel type</option>
                                            <option value="Gasoline">Gasoline</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
                                        <select
                                            id="transmission"
                                            value={formData.transmission}
                                            onChange={(e) => handleInputChange('transmission', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                            required
                                        >
                                            <option value="">Select transmission</option>
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Car Image</label>
                                    {/* <ImageUpload
                                        value={formData.imageUrl}
                                        onChange={(url) => handleInputChange('imageUrl', url)}
                                    /> */}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center text-sm"
                                >
                                    {isLoading ? (
                                        <>Saving...</>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            {isNewListing ? 'Create Listing' : 'Save Changes'}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Preview */}
                    {/* <div>
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
                            <h2 className="text-lg md:text-xl font-semibold mb-4">Preview</h2>
                            <p className="text-gray-600 mb-4 text-sm">How the listing will appear</p>

                            <div className="space-y-4">
                                {formData.imageUrl && (
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="w-full h-32 object-cover rounded-lg"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400';
                                        }}
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg">{formData.title || 'Listing Title'}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{formData.description || 'Description will appear here...'}</p>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Price:</span>
                                        <span className="font-medium">${formData.price}/day</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Vehicle:</span>
                                        <span>{formData.year} {formData.make} {formData.model}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <span>{formData.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Mileage:</span>
                                        <span>{formData.mileage.toLocaleString()} miles</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Fuel:</span>
                                        <span>{formData.fuelType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Transmission:</span>
                                        <span>{formData.transmission}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default CarForm;