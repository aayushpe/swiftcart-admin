// Import statements as before
import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImage, faTags, faRuler, faCog } from '@fortawesome/free-solid-svg-icons';

const Navbar = async() => {
    const { userId } = auth()

    if(!userId) {
        redirect("/sign-in")
    }
    const stores = await prismadb.store.findMany({
        where: {
            userID: userId
        }
    })
    
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores}/>

                <MainNav className="mx-6"/>

                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/landing"/>
                    <ThemeToggle/>
                </div>
            </div>
        </div>
    )
}

export default Navbar