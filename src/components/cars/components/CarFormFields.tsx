/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Save } from "lucide-react";

const CarFormFields = ({ formData, handleInputChange, handleSubmit, formLoading }: any) => {
    const yearOptions = Array.from({ length: 25 }, (_, i) => 2024 - i);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 shadow-xl rounded-lg space-y-4 md:space-y-6">
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
                <input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center text-sm"
            >
                {formLoading ? (
                    <>Saving...</>
                ) : (
                    <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </>
                )}
            </button>
        </form>
    );
};

export default CarFormFields;
