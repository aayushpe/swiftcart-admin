"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Home',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/banners`,
      label: 'Banners',
      active: pathname === `/${params.storeId}/banners`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    },
  ];

  return (
    <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >

    {routes.map((route) => (
        <Link
            key={route.href}
            href={route.href}
            className={cn(
                `text-sm font-medium ${route.active ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-300" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`,
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
            )}
        >

            {route.label}
        
        </Link>

    ))}
    </nav>
)
}




/*
return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
      {routes.map((route) => (
        <Link key={route.href} href={route.href}
          className={`text-sm font-medium ${route.active ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-300" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}>
            {<FontAwesomeIcon icon={route.icon} className="mr-2" />} 
            {route.label}
        </Link>
      ))}
    </nav>
  );
}

*/