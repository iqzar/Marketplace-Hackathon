import Top from '../top';
import Header from '../header';
import Footer from '../footer';
import Image from 'next/image';
import logo from '../public/logo.png';
import { SignOutButton, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Login() {
    return (
        <>
            <Top />
            <Header />
            <div className="flex flex-col items-center px-4 sm:px-0 sm:w-[380px] sm:ml-auto sm:mr-auto">
                <Image className="mt-10" src={logo} width={50} height={100} alt="logo" />
                <h2 className="font-bold text-lg text-center mt-5">
                    YOUR ACCOUNT
                    <br />
                    FOR EVERYTHING
                    <br />
                    NIKE
                </h2>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <div className="w-full mt-5">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Email address"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="w-full mt-4">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex justify-between items-center w-full mt-5">
                    <p className="text-[12px] text-light">Keep me signed in</p>
                    <p className="text-[12px] text-dark">Forgotten your password?</p>
                </div>
                <p className="text-[12px] text-light text-center mt-5">
                    By logging in you agree to Nike Privacy Policy
                    <br />
                    and Terms of Use.
                </p>
                <div className="bg-black w-full text-white py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline mt-5">  
                    <SignedOut>
                        <SignInButton mode="modal"/>
                    </SignedOut>

                </div>
                <p className="text-[12px] text-light text-center mt-5">
                    Not a member? Join Us
                </p>
            </div>
            <Footer />
       </>
    );
}
