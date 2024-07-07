import db from "@/db/db";
import {Product} from "@prisma/client";
import {FaArrowRightLong} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ProductCard, ProductCardSkeleton} from "@/components/ProductCard";
import {MdOutlineArrowRight} from "react-icons/md";
import {Suspense} from "react";

function getMostPopularProducts() {
    return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: {Order: {_count: "desc"}},
        take: 6
    });
}

function getNewestProducts() {
    return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: {createdAt: "desc"},
        take: 6
    });
}

export default function HomePage() {
    const products = getNewestProducts()
    return <main className="space-y-12">
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts}/>
        <ProductGridSection title="Newest" productsFetcher={getNewestProducts}/>
    </main>
}

type ProductGridSectionProps = {
    title: string,
    productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({productsFetcher, title}: ProductGridSectionProps) {
    return <div className="space-y-4">
        <div className="flex gap-4">
            <h2 className="text-3xl font-bold"><MdOutlineArrowRight className="inline-block mb-1"/>{title}</h2>
            <Button variant="outline">
                <Link href="/products" className="space-x-2">
                    <span>
                        View All
                    </span>
                    <FaArrowRightLong className="inline-block mb-0.5 size-3"/>
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={<>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
            </>}>
                <ProductSuspense productsFetcher={productsFetcher}/>
            </Suspense>
        </div>
    </div>
}

async function ProductSuspense({productsFetcher}: { productsFetcher: () => Promise<Product[]> }) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product}/>
    ))
}