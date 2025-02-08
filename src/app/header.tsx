import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import logo from './public/logo.png'
import Link from 'next/link';
import SearchBar from './searchbar';
import { MenuIcon } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

  
export default function Header() {
    return (
        <main>
            <div className='flex lg:space-x-32 sm:space-x-10 md:space-x-20 ml-3 pt-[10px] pb-[10px] md:ml-10 md:mr-10'>
            <div className="flex h-[60] sm:space-x-10  lg:space-x-60">
                <Link href={'./'}><Image src={logo} width={60} height={5} alt='logo'/></Link>
                <ul className="md:block hidden md:mr-10 mt-1 font-semibold ">
                    <li className="text-xs space-x-3">
                    <Link className="hover:border-b-2" href={"/allproducts"}>All Products</Link>
                    <Link className="hover:border-b-2" href="/men">Mens</Link>
                    <Link className="hover:border-b-2" href="/women">Womens</Link>
                    <Link className="hover:border-b-2" href="/kid">Kids</Link>
                    <Link className="hover:border-b-2" href={"/allproducts"}>Sale</Link>
                    <Link className="hover:border-b-2" href="/">Jordan</Link>
                   
                    </li>
                 </ul>
                <Sheet>
                <SheetTrigger className="md:hidden"><MenuIcon className="mr-5" /></SheetTrigger>
                <SheetContent className="bg-white ml-5">
                <ul className="bg-white ml-5">
                <li className="flex flex-col font-poppins text-sm leading-loose">
                    <Link href={'/allproducts'}>All Products</Link>
                    <Link href='/men'>Mens</Link>
                    <Link href='/Women'>Womens</Link>
                    <Link href={'/kid'}>Kids</Link>
                    <Link href={'/allproducts'}>Sale</Link>
                    <Link href={'/#'}>Jordan</Link>
                </li>
                
                </ul>
                </SheetContent>
                </Sheet> 
            </div>
            <div className="flex space-x-5 md:space-x-8 font-poppins">

                       <SearchBar/>
                      
                
                    <Link href={'/wishlist'}><Heart className="mt-1 hover:text-rose-700" size={16} /></Link>
                    <Link href={'/cart'}><ShoppingBag className="mt-1" size={16} /></Link>
                    
                </div>
                </div>
        </main>
    );
}