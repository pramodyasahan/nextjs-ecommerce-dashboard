"use client";

import React, {useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {formatCurrency} from "@/lib/formatters";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {IoIosSave} from "react-icons/io";
import {addProduct, updateProduct} from "@/app/admin/_actions/products";
import {useFormState, useFormStatus} from 'react-dom';
import Image from "next/image"
import {Product} from "@prisma/client";

export default function ProductForm({product}: { product?: Product | null }) {
    const [error, action] = useFormState(product == null ? addProduct :
        updateProduct.bind(null, product.id), {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

    return (
        <form action={action} className="space-y-6 mt-10">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-xl">Name</Label>
                <Input className="border-gray-300" id="name" name="name" type="text" defaultValue={product?.name}
                       required/>
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2 relative">
                <Label htmlFor="priceInCents" className="text-xl">Price In Cents</Label>
                <div className="relative">
                    <Input
                        id="priceInCents"
                        name="priceInCents"
                        type="number"
                        defaultValue={product?.priceInCents}
                        required
                        value={priceInCents !== undefined ? priceInCents : ''}
                        onChange={e => {
                            const value = e.target.value;
                            setPriceInCents(value === '' ? undefined : Number(value));
                        }}
                        className="pr-10 border-gray-300"
                    />
                    {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
        </span>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className="text-xl">Description</Label>
                <Textarea className="border-gray-300" id="description" name="description"
                          defaultValue={product?.description} required/>
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file" className="text-xl">File</Label>
                <Input className="border-gray-300" id="file" name="file" type="file"
                       required={product == null || false}/>
                {product != null && (<div className="text-muted-foreground text-sm pl-5">{product.filePath}</div>)}
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image" className="text-xl">Image</Label>
                <Input className="border-gray-300" id="image" name="image" type="file"
                       required={product == null || false}/>
                {product != null && (
                    <Image src={product.imagePath} height="350" width="400" alt="product Image"/>)}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton/>
        </form>
    );
};

function SubmitButton() {
    const {pending} = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : <><IoIosSave
        className="inline-block mr-1"/>Save</>}</Button>
}
