"use client"
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Loader2, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

  const {isLoading,cartData} = useContext(CartContext)
  const session = useSession();
  return <>

  <nav className="py-2 bg-gray-50 text-2xl font-semibold shadow sticky top-0">
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1><Link href={'/'}><Image src='/freshcart-logo.svg' alt='' width={100} height={100}/></Link></h1>
        
      <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/">Home</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/cart">Cart</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/wishList">WishList</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center">
        {session.status == 'authenticated' && <h2 className="text-sm me-2">Hi {session.data?.user.name}</h2>
}
        <DropdownMenu>
  <DropdownMenuTrigger className="outline-0"><UserIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {session.status == 'authenticated'?
    <>
    <Link href={'/profile'}><DropdownMenuItem>Profile</DropdownMenuItem>
    </Link>
    <DropdownMenuItem onClick={() => signOut({
      callbackUrl: '/'
    })}>Logout</DropdownMenuItem>

    </>:
    <>
    <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem>
    </Link>
    <Link href={'/register'}><DropdownMenuItem>register</DropdownMenuItem>
    </Link>
    </>}
  </DropdownMenuContent>
        </DropdownMenu>

        {session.status=='authenticated' && 
        <Link href={'/cart'} className="p-3 relative">
          <ShoppingCartIcon/>
          <Badge className="size-4 pb-1.5 pt-1 px-1 rounded-full  absolute top-0 end-0">
          <span>{isLoading ? <Loader2 className="animate-spin size-4"/> : cartData?.numOfCartItems}</span>
        </Badge>
        </Link>
}
      </div>


        
      </div>
    </div>
  </nav>




  
  </>
}
