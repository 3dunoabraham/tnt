import AppClientDesc from "@/src/items/AppClientDesc";
import LoginBtn from "@/src/items/LoginBtn";
import SidebarHeader from "@/src/partials/ims/SidebarHeader";

export default function Component({}) {
    return (<>
    <SidebarHeader />
    <div className='flex-1'></div>
    <div className='pa-2 w-100'><LoginBtn><AppClientDesc /></LoginBtn></div>
    </>)
}