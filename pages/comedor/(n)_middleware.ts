import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, event: NextFetchEvent) {
    if (Object.keys(req.cookies).length < 1) {
        return NextResponse.redirect('/auth/signin')
    }
}