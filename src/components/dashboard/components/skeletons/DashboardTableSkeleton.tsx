import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'

const DashboardTableSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow border overflow-hidden mx-4">
            <Table>
                <TableBody>
                    {Array(5)
                        .fill(null)
                        .map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={7}>
                                    <Skeleton className='h-12 w-full' />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DashboardTableSkeleton