/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Car, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
// import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { user, login } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [router, user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await login(email, password);

            if (success) {
                toast.success('Login successful! Welcome to the admin panel.');
                router.push('/dashboard');
            } else {
                toast.error('Invalid credentials. Please try again.');
            }
        } catch (error: any) {
            toast.error(error.message || 'An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
            <div className="flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md space-y-6'
                >
                    <Card className="shadow-xl">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-blue-600 rounded-full">
                                    <Car className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                            <CardDescription>
                                Sign in to access the car rental admin panel
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                            <span className="sr-only">
                                                {showPassword ? "Hide password" : "Show password"}
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </form>

                            {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
                                <p className="text-xs text-blue-600">Email: admin@carrentals.com</p>
                                <p className="text-xs text-blue-600">Password: admin123</p>
                            </div> */}
                        </CardContent>
                        <CardFooter className="text-center text-sm">
                            <div className="mx-auto">
                                Don't have an account?{" "}
                                <Link href="/signup" className="font-medium text-balck">
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
                        <p className="text-xs text-blue-600">Email: admin@carrentals.com</p>
                        <p className="text-xs text-blue-600">Password: admin123</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;