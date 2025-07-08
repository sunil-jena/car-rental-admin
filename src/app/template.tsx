import { AuthProvider } from "@/components/context/AuthContext";
import { CarListingProvider } from "@/components/context/CarListingContext";

export default function Template({ children }: { children: React.ReactNode }) {
    return <AuthProvider>
        <CarListingProvider>
            {children}
        </CarListingProvider>
    </AuthProvider>
}