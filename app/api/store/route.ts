import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
        where: { userId_slug: { userId: session.user.id, slug: data.slug } },
        update: data,
        create: {
            ...data,
            userId: session.user.id
        }
    })

    return NextResponse.json(store)
}
