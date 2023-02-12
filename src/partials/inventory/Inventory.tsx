import { useSession } from "next-auth/react";


export default function Component({}) {
    const { data: session } = useSession();

    return (
    <div className="h-100 w-100">
        <div className='tx-xxxl tx-bold-2 opaci-25 tx-ls-8 pa-8'>TABLE</div>
        {!!session &&
            <div className="flex-wrap ma-8">
                Logged In!
            </div>
        }
    </div>
    )
}