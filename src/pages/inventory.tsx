import type { ReactElement } from 'react'
import Layout from '@/src/partials/Layout'
import NestedLayout from '@/src/items/NestedLayout'
import type { NextPageWithLayout } from './_app'
import LoginBtn from "@/src/items/LoginBtn";
import AppClientDesc from "@/src/items/AppClientDesc";
import Link from 'next/link';

export default function Page() {
    return (
    <div className='flex'>
        <div className='flex _ddg'>
            <Link href="/"><h2 className="">Home</h2></Link>
        </div>
        <LoginBtn><AppClientDesc /></LoginBtn>
    </div>
    )
}
