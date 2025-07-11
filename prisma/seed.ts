/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Insert admin users
    const adminUsersData = [
        { email: 'admin@carrentals.com', name: 'John Smith', role: 'admin', password: 'admin123' },
        { email: 'manager@carrentals.com', name: 'Sarah Johnson', role: 'admin', password: 'manager123' },
        { email: 'supervisor@carrentals.com', name: 'Mike Wilson', role: 'admin', password: 'supervisor123' },
    ];

    for (const admin of adminUsersData) {
        await prisma.adminUser.upsert({
            where: { email: admin.email },
            update: admin,
            create: admin,
        });
    }

    const admins = await prisma.adminUser.findMany();

    // 2. Insert all car listings
    const carListingsData = [
        {
            title: '2020 Toyota Camry - Perfect for City Trips',
            slug: '2020-toyota-cmry',
            code: 'TCAMRY20',
            description: 'Clean, reliable sedan with excellent fuel economy. Perfect for business trips or weekend getaways.',
            price: 89,
            location: 'Los Angeles, CA',
            year: 2020,
            make: 'Toyota',
            model: 'Camry',
            mileage: 25000,
            fuelType: 'Hybrid',
            transmission: 'Automatic',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400',
            submittedBy: 'john.doe@email.com',
            submittedAt: new Date('2024-01-15T10:00:00Z'),
            lastModified: new Date('2024-01-15T10:00:00Z')
        },
        {
            title: '2019 BMW X5 - Luxury SUV Experience',
            slug: '2019-bmw-x5',
            code: 'BMWX519',
            description: 'Premium SUV with all the latest features. Spacious interior, advanced safety features, and powerful performance.',
            price: 150,
            location: 'Miami, FL',
            year: 2019,
            make: 'BMW',
            model: 'X5',
            mileage: 35000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'approved',
            imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
            submittedBy: 'sarah.wilson@email.com',
            submittedAt: new Date('2024-01-14T14:30:00Z'),
            lastModified: new Date('2024-01-14T15:00:00Z')
        },
        {
            title: '2021 Tesla Model 3 - Electric & Efficient',
            slug: '2021-tesla-model-3',
            code: 'TESLA21',
            description: 'Latest electric vehicle with autopilot features. Zero emissions, cutting-edge technology, and exceptional range.',
            price: 120,
            location: 'San Francisco, CA',
            year: 2021,
            make: 'Tesla',
            model: 'Model 3',
            mileage: 15000,
            fuelType: 'Electric',
            transmission: 'Automatic',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
            submittedBy: 'mike.tech@email.com',
            submittedAt: new Date('2024-01-16T09:15:00Z'),
            lastModified: new Date('2024-01-16T09:15:00Z')
        },
        {
            title: '2018 Ford Mustang - Sports Car Thrill',
            slug: '2018-ford-mustang',
            code: 'FRDMST18',
            description: 'Classic American muscle car with modern performance. Perfect for weekend adventures and special occasions.',
            price: 110,
            location: 'Austin, TX',
            year: 2018,
            make: 'Ford',
            model: 'Mustang',
            mileage: 45000,
            fuelType: 'Gasoline',
            transmission: 'Manual',
            status: 'rejected',
            imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
            submittedBy: 'alex.driver@email.com',
            submittedAt: new Date('2024-01-13T16:45:00Z'),
            lastModified: new Date('2024-01-13T17:30:00Z')
        },
        {
            title: '2022 Honda CR-V - Family SUV',
            slug: '2022-honda-cr-v',
            code: 'HNDCVR22',
            description: 'Reliable family SUV with excellent safety ratings. Spacious cargo area and comfortable seating for 5.',
            price: 95,
            location: 'Chicago, IL',
            year: 2022,
            make: 'Honda',
            model: 'CR-V',
            mileage: 12000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'approved',
            imageUrl: 'https://images.unsplash.com/photo-1592797520856-883837ddd186?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            submittedBy: 'family.rental@email.com',
            submittedAt: new Date('2024-01-12T11:20:00Z'),
            lastModified: new Date('2024-01-12T12:00:00Z')
        },
        {
            title: '2020 Audi A4 - Premium Sedan',
            slug: '2020-audi-a4',
            code: 'AUDIA420',
            description: 'Luxury sedan with advanced technology and comfort features. Perfect for executive travel.',
            price: 135,
            location: 'New York, NY',
            year: 2020,
            make: 'Audi',
            model: 'A4',
            mileage: 28000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
            submittedBy: 'luxury.cars@email.com',
            submittedAt: new Date('2024-01-17T13:20:00Z'),
            lastModified: new Date('2024-01-17T13:20:00Z')
        },
        {
            title: '2019 Jeep Wrangler - Off-Road Adventure',
            slug: '2019-jeep-wrangler',
            code: "JWRNGLR19",
            description: 'Rugged 4x4 SUV perfect for outdoor adventures and off-road exploration.',
            price: 105,
            location: 'Denver, CO',
            year: 2019,
            make: 'Jeep',
            model: 'Wrangler',
            mileage: 40000,
            fuelType: 'Gasoline',
            transmission: 'Manual',
            status: 'approved',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            submittedBy: 'adventure.rides@email.com',
            submittedAt: new Date('2024-01-11T08:45:00Z'),
            lastModified: new Date('2024-01-11T09:30:00Z')
        },
        {
            title: '2021 Mercedes-Benz C-Class - Executive Choice',
            slug: '2021-mercedes-benz-c-class',
            code: "MRCBZC21",
            description: 'Elegant luxury sedan with premium interior and advanced safety features.',
            price: 140,
            location: 'Seattle, WA',
            year: 2021,
            make: 'Mercedes-Benz',
            model: 'C-Class',
            mileage: 18000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
            submittedBy: 'executive.cars@email.com',
            submittedAt: new Date('2024-01-18T10:15:00Z'),
            lastModified: new Date('2024-01-18T10:15:00Z')
        },
        {
            title: '2020 Subaru Outback - All-Weather Reliable',
            slug: '2020-subaru-outback',
            code: 'SUBOUT20',
            description: 'All-wheel drive wagon perfect for all weather conditions and outdoor activities.',
            price: 85,
            location: 'Portland, OR',
            year: 2020,
            make: 'Subaru',
            model: 'Outback',
            mileage: 32000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'approved',
            imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
            submittedBy: 'outdoor.rentals@email.com',
            submittedAt: new Date('2024-01-10T14:00:00Z'),
            lastModified: new Date('2024-01-10T15:15:00Z')
        },
        {
            title: '2018 Nissan Altima - Economy Choice',
            slug: '2018-nissan-altima',
            code: 'NISSAM18',
            description: 'Fuel-efficient sedan with modern features. Great value for money.',
            price: 75,
            location: 'Phoenix, AZ',
            year: 2018,
            make: 'Nissan',
            model: 'Altima',
            mileage: 55000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'rejected',
            imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
            submittedBy: 'budget.cars@email.com',
            submittedAt: new Date('2024-01-09T16:30:00Z'),
            lastModified: new Date('2024-01-09T17:45:00Z')
        },
        {
            title: '2021 Chevrolet Tahoe - Large Family SUV',
            slug: '2021-chevrolet-tahoe',
            code: 'CHVRLTT21',
            description: 'Spacious 8-seater SUV perfect for large families and group trips.',
            price: 160,
            location: 'Dallas, TX',
            year: 2021,
            make: 'Chevrolet',
            model: 'Tahoe',
            mileage: 22000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
            submittedBy: 'family.fleet@email.com',
            submittedAt: new Date('2024-01-19T11:00:00Z'),
            lastModified: new Date('2024-01-19T11:00:00Z')
        },
        {
            title: '2020 Volkswagen Jetta - Compact Sedan',
            slug: '2020-volkswagen-jetta',
            code: "VLKSWNJ20",
            description: 'Efficient compact sedan with European engineering and modern tech.',
            price: 80,
            location: 'Boston, MA',
            year: 2020,
            make: 'Volkswagen',
            model: 'Jetta',
            mileage: 30000,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            status: 'approved',
            imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
            submittedBy: 'euro.cars@email.com',
            submittedAt: new Date('2024-01-08T09:30:00Z'),
            lastModified: new Date('2024-01-08T10:15:00Z')
        }
    ];

    await prisma.carListing.createMany({ data: carListingsData });

    const listings = await prisma.carListing.findMany();

    // 3. Insert audit logs using inserted IDs
    const auditLogsData = [
        { listingCode: 'BMWX519', adminEmail: 'admin@carrentals.com', action: 'approved', details: 'BMW X5 listing approved after verification - all documentation complete', timestamp: new Date('2024-01-14T15:00:00Z') },
        { listingCode: 'FRDMST18', adminEmail: 'manager@carrentals.com', action: 'rejected', details: 'Ford Mustang rejected - vehicle condition does not meet standards, high mileage concern', timestamp: new Date('2024-01-13T17:30:00Z') },
        { listingCode: 'HNDCVR22', adminEmail: 'supervisor@carrentals.com', action: 'approved', details: 'Honda CR-V approved - excellent condition, verified documentation and insurance', timestamp: new Date('2024-01-12T12:00:00Z') },
        { listingCode: 'JWRNGLR19', adminEmail: 'admin@carrentals.com', action: 'approved', details: 'Jeep Wrangler approved - 4x4 capability verified, adventure package confirmed', timestamp: new Date('2024-01-11T09:30:00Z') },
        { listingCode: 'SUBOUT20', adminEmail: 'manager@carrentals.com', action: 'approved', details: 'Subaru Outback approved - AWD system tested, all-weather tires confirmed', timestamp: new Date('2024-01-10T15:15:00Z') },
        { listingCode: 'NISSAM18', adminEmail: 'admin@carrentals.com', action: 'rejected', details: 'Nissan Altima rejected - excessive wear and tear, maintenance records incomplete', timestamp: new Date('2024-01-09T17:45:00Z') },
        { listingCode: 'VLKSWNJ20', adminEmail: 'supervisor@carrentals.com', action: 'approved', details: 'Volkswagen Jetta approved - compact design ideal for city driving, fuel efficient', timestamp: new Date('2024-01-08T10:15:00Z') },
        { listingCode: 'TCAMRY20', adminEmail: 'supervisor@carrentals.com', action: 'edited', details: 'Toyota Camry listing updated - price adjusted from $92 to $89 per day', timestamp: new Date('2024-01-07T14:20:00Z') },
        { listingCode: 'TESLA21', adminEmail: 'admin@carrentals.com', action: 'edited', details: 'Tesla Model 3 - description updated to include autopilot features and charging info', timestamp: new Date('2024-01-06T16:45:00Z') },
        { listingCode: 'AUDIA420', adminEmail: 'manager@carrentals.com', action: 'edited', details: 'Audi A4 - location updated from Manhattan to New York, NY for clarity', timestamp: new Date('2024-01-05T11:30:00Z') }
    ];

    for (const log of auditLogsData) {
        const listing = listings.find((l: any) => l.code === log.listingCode);
        const admin = admins.find((a: { email: string; }) => a.email === log.adminEmail);
        if (listing && admin) {
            await prisma.auditLogEntry.create({
                data: {
                    listingId: listing.id,
                    adminId: admin.id,
                    action: log.action,
                    details: log.details,
                    timestamp: log.timestamp
                }
            });
        }
    }

    console.log('✅ Seed completed successfully');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
