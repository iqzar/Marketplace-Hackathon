import Image from "next/image"
import hero from './public/hero3.jpg'
import Link from "next/link"
export default function Sec3(){
    return(
        <main className="ml-10 mr-10 mt-20">
            <h2 className='text-[22px] font-semibold mb-5'>Dont Miss</h2>
            <div className="flex justify-center">
            <Image src={hero} height={200} width={1000} alt="hero"/>
            </div>
            <div className="text-center">
            <h1 className="text-[40px] md:text-[54px] mb-8 text-center mt-10">FLIGHT ESSENTIALS</h1>
            <p className="text-[15px] text-center">Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.</p>
            <button className="w-[110px] h-[39px] mt-5 border-b-2 bg-black text-white text-[15px] rounded-full items-center justify-center text-center"><Link href='/allproducts'>Shop</Link></button>
       </div>
        </main>
    )
}