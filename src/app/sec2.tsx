import Image from "next/image"
import hero from './public/hero.png'
import Link from "next/link"
export default function Sec2(){
    return(
        <main className="ml-10 mr-10 mt-20">
            <h2 className='text-[22px] font-semibold mb-5'>Featured</h2>
            <div className="flex justify-center">
            <Image src={hero} height={200} width={1000} alt="hero"/>
            </div >
            <div className='text-center'>
            <h1 className="text-[40px]  md:text-[54px] mb-8 text-center mt-10">STEP INTO WHAT FEELS GOOD</h1>
            <p className="text-[15px] text-center">Cause everyone should know the feeling of running in that perfect pair.</p>
            <button className="w-[140px] h-[39px] mt-5 border-b-2 bg-black text-white text-[15px] rounded-full justify-center items-center"><Link href='/jordan'>Find Your Shoe</Link></button>
      
</div>
        </main>
    )
}