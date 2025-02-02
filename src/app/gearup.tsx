import Image from "next/image";
import p5 from './public/image5.png'
import p6 from './public/image6.png'
import p7 from './public/image7.png'
import p8 from './public/image8.png'
import Arrows from "./arrows";
import { useState } from "react";

export default function Gearup(){

    const products = [
        { id: 1, image: p5, title: "Nike Dri-FIT ADV TechKnit Ultra", price: "₹ 3 895", detail: "Men's Short-Sleeve Running Top"},
        { id: 2, image: p6, title: "Nike Dri-FIT Challenger", price: "₹ 2 495", detail: "Men's 18cm (approx.) 2-in-1 Versatile Shorts"},
       
        
    ];

    const productss = [
        { id: 1, image: p7, title: "NIKE Air Max Pulse", price: "$13.995", detail: "Women's Shoes"},
        { id: 2, image: p8, title: "NIKE Air Max Puls", price: "$13.995", detail: "Men's Shoes"},
       
        
    ];

    const [startIndex, setStartIndex] = useState<number>(0); 
    const nextProducts = () => {
        if (startIndex + 4 < products.length) {
          setStartIndex(startIndex + 1); // Move the window right
        }
      };
    
      // Function to show the previous set of products (move right)
      const prevProducts = () => {
        if (startIndex > 0) {
          setStartIndex(startIndex - 1); // Move the window left
        }
      };
    
    return(
        <main className="flex flex-col md:flex-row justify-around">
            <div>
             
            <div className='flex justify-end gap-5 mt-20 md:ml-10 md:mr-10 mr-20 mb-5'>
            <p className='text-[15px]'>Shop Mens</p>
            <Arrows onPrev={prevProducts} onNext={nextProducts} />
            </div>

            <div className='flex md:flex-row flex-col md:space-y-0 md:space-x-4 space-y-8 md:ml-0 ml-20 md:mt-0 mt-4 md:mb-0'>
            {products.map((product) => (
                    <div key={product.id}>
                        
            <Image src={product.image} height={200} width={200} alt='shoe1'/>
            <div className='flex md:flex-row flex-col justify-between mt-5 text-[10px] text-black'>
                <p className='font-semibold'>{product.title}</p>
                <p>{product.price}</p>
            </div>
            <p className='text-[10px] text-med'>{product.detail}</p>
            </div>
            
            ))}
            </div>
            </div>

            <div>
            <div className='flex justify-end gap-5 mt-20 ml-10 mr-20 mb-5'>
            <p className='text-[15px]'>Shop Womens</p>
            <Arrows onPrev={prevProducts} onNext={nextProducts} />
            </div>
            
            <div className='flex md:flex-row flex-col md:space-y-0 md:space-x-4 space-y-8 ml-20 md:mt-0 mt-4'>
            {productss.map((product) => (
                    <div key={product.id}>
                        
            <Image src={product.image} height={200} width={200} alt='shoe1'/>
            <div className='flex md:flex-row flex-col justify-between mt-5 text-[10px] text-black'>
                <p className='font-semibold'>{product.title}</p>
                <p>{product.price}</p>
            </div>
            <p className='text-[10px] text-med'>{product.detail}</p>
            </div>
            
            ))}
            </div>
            </div>

            

        </main>
    )
}