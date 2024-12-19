import Image from "next/image"
import image1 from './public/image9.png'
import image2 from './public/image10.png'
import image3 from './public/image11.png'

export default function Essential(){
    return(
        <main className="ml-10 mr-10 mt-20">
              <h2 className='text-[22px] font-semibold mb-5'>The Essentials</h2>
              <div className="flex flex-col md:flex-row space-y-5">
              <div className="relative inline-block md:mb-0">
              <Image  className='w-full h-auto'src={image1} width={320} height={540} alt="image1"/>
      <button className="absolute bottom-12 left-12 transform bg-white text-black px-4 py-1 text-[14px] font-semibold rounded-full hover:bg-opacity-80 focus:outline-none">
        Mens
      </button>
    </div>
    <div className="relative inline-block md:mb-0 mb-5">
              <Image  className='w-full h-auto'src={image2} width={320} height={540} alt="image1"/>
              <button className="absolute bottom-12 left-12 transform bg-white text-black px-4 py-1 text-[14px] font-semibold rounded-full hover:bg-opacity-80 focus:outline-none">
        Womens
      </button>
    </div>
    <div className="relative inline-block">
              <Image  className='w-full h-auto'src={image3} width={320} height={540} alt="image1"/>
              <button className="absolute bottom-12 left-12 transform bg-white text-black px-4 py-1 text-[14px] font-semibold rounded-full hover:bg-opacity-80 focus:outline-none">
        Kids
      </button>
    </div>
               
                
              </div>
        </main>
    )
}

