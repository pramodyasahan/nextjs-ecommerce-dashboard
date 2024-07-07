import {Nav, NavLink} from "@/components/Nav";
import React from "react";
import {AiFillHome} from "react-icons/ai";

export const dynamic = "force-dynamic"

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Nav>
            <NavLink href="/">
                <AiFillHome className="inline-block mr-1 mb-1"/>Home
            </NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">Customers</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}