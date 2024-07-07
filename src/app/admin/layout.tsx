import {Nav, NavLink} from "@/components/Nav";
import React from "react";
import {MdDashboard} from "react-icons/md";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Nav>
            <NavLink href="/admin">
                <MdDashboard className="inline-block mr-1 mb-0.5"/> Dashboard
            </NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/users">Customers</NavLink>
            <NavLink href="/admin/orders">Sales</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}