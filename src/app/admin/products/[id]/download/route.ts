import {NextRequest, NextResponse} from "next/server";
import db from "@/db/db";
import {notFound} from "next/navigation";
import fs from "fs/promises";

export async function GET(req: NextRequest, {params: {id}}: { params: { id: string } }) {
    const product = await db.product.findUnique({
        where: {id},
        select: {
            filePath: true,
            name: true,
        }
    })

    if (product == null) return notFound()

    const [{size}, file] = await Promise.all([
        fs.stat(product.filePath),
        fs.readFile(product.filePath)
    ])
    const extension = product.filePath.split(".").pop()

    return new NextResponse(file, {
        headers: {
            "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
            "Content-Length": size.toString(),
        }
    })
}
