import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const store = await prisma.store.findFirst({
        where: { userId: session.user.id }
    })

    return NextResponse.json(store)
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const store = await prisma.store.upsert({
        where: { userId_slug: { userId: session.user.id, slug: data.slug } }, // Note: Need unique constraint in schema
        update: data,
        create: {
            ...data,
            userId: session.user.id
        }
    })

    return NextResponse.json(store)
}
