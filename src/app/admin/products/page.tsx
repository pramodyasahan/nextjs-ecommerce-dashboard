import React from 'react';
import PageHeader from "@/app/admin/_components/PageHeader";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IoMdAddCircleOutline} from "react-icons/io";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const AdminProductsPage = () => {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button>
                    <Link href="/admin/products/new"><IoMdAddCircleOutline className="inline-block size-4 mb-0.5 mr-1"/>Add
                        Product</Link>
                </Button>
            </div>
            <ProductsTable/>
        </>
    );
};

function ProductsTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow className="flex justify-between items-center">
                    <TableHead className='w-0'><span className="sr-only">Available For Purchase</span></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}

export default AdminProductsPage;
