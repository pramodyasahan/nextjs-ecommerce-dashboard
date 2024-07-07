import React from 'react';
import PageHeader from "@/app/admin/_components/PageHeader";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IoMdAddCircleOutline} from "react-icons/io";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import db from "@/db/db";
import {CheckCircle2, MoreVertical, XCircle} from "lucide-react";
import {formatCurrency, formatNumber} from "@/lib/formatters";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {FaDownload} from "react-icons/fa";
import {RiEdit2Fill} from "react-icons/ri";
import {ActiveToggleDropdownItem, DeleteDropdownItem} from "@/app/admin/products/_components/ProductActions";

const AdminProductsPage = () => {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button>
                    <Link href="/admin/products/new"><IoMdAddCircleOutline
                        className="inline-block size-4 mb-0.5 mr-1.5"/>Add
                        Product</Link>
                </Button>
            </div>
            <ProductsTable/>
        </>
    );
};

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: {select: {Order: true}},
        },
        orderBy: {name: "asc"},
    })

    if (products.length === 0) return <p>No Products Found</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'><span className="sr-only">Available For Purchase</span></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow>
                        <TableCell>
                            {product.isAvailableForPurchase ? (
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2/>
                                </>
                            ) : (
                                <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle/>
                                </>
                            )}
                        </TableCell>
                        <TableCell>
                            {product.name}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(product.priceInCents / 100)}
                        </TableCell>
                        <TableCell>
                            {formatNumber(product._count.Order)}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical/>
                                    <span className="sr-only">Action</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="flex justify-items-start" asChild>
                                        <a href={`/admin/products/${product.id}/download`}>
                                            <FaDownload className="mr-3"/> Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex justify-items-start" asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}><RiEdit2Fill
                                            className="mr-3"/> Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id}
                                                              isAvailableForPurchase={product.isAvailableForPurchase}/>
                                    <DeleteDropdownItem id={product.id} disabled={product._count.Order > 0}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AdminProductsPage;
