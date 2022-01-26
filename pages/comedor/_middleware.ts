import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
// const url = require('url')

export function middleware(req: NextRequest, event: NextFetchEvent) {
    console.log(req.cookies)
    if (Object.keys(req.cookies).length < 1) {
        return NextResponse.redirect('/auth/signin')
    }
}