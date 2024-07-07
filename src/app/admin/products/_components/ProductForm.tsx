"use client";

import React, {useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {formatCurrency} from "@/lib/formatters";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {IoIosSave} from "react-icons/io";
import {addProduct} from "@/app/admin/_actions/products";

const ProductForm = () => {
    const [priceInCents, setPriceInCents] = useState<number>()

    return (
        <form action={addProduct} className="space-y-5 mt-10">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-xl">Name</Label>
                <Input id="name" name="name" type="text" required/>
            </div>
            <div className="space-y-2 relative">
                <Label htmlFor="priceIncents" className="text-xl">Price In Cents</Label>
                <div className="relative">
                    <Input
                        id="priceIncents"
                        name="priceIncents"
                        type="number"
                        required
                        value={priceInCents}
                        onChange={e => setPriceInCents(Number(e.target.value) || 0)}
                        className="pr-10"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {formatCurrency((priceInCents || 0) / 100)}
                </span>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className="text-xl">Description</Label>
                <Textarea id="description" name="description" required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="file" className="text-xl">File</Label>
                <Input id="file" name="file" type="file" required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="image" className="text-xl">Image</Label>
                <Input id="image" name="image" type="file" required/>
            </div>
            <Button type="submit"><IoIosSave className="inline-block mr-1"/>Save</Button>
        </form>
    );
};

export default ProductForm;