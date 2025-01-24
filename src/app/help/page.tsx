import Top from "../top";
import Header from "../header";
import Footer from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faMessage, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Left from "../left";

export default function Help() {
    return (
        <main>
            <Top />
            <Header />

            <h2 className="text-[32px] lg:ml-80 mt-10">GET HELP</h2>

            <div className="flex flex-col lg:flex-row lg:space-x-10 px-4 lg:px-0 md:mr-10">
                <Left/>
                <div className="border-l-2 border-pir mt-10 lg:mt-28 hidden lg:block"></div>
                <div id="right" className="w-full lg:w-[313px] flex flex-col items-center">
                    <h2 className="text-[22px] text-center mt-10 lg:mt-28 font-semibold">CONTACT US</h2>

                    <div className="mt-3">
                        <FontAwesomeIcon icon={faMobileScreenButton} className="h-[34px] w-[34px] mx-auto lg:ml-11 mt-10" />
                        <div>
                            <p className="text-[12px] text-side leading-5 text-center mt-3">
                                000 800 919 0566<br />
                                Products & Orders: 24 hours a day,<br />
                                7 days a week<br />
                                Company Info & Enquiries: 07:30 -<br />
                                16:30, Monday - Friday
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <FontAwesomeIcon icon={faMessage} className="h-[34px] w-[34px] mx-auto mt-10 lg:ml-6" />
                        <div>
                            <p className="text-[12px] text-side leading-5 text-center mt-3">
                                24 hours a day<br />
                                7 days a week
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <FontAwesomeIcon icon={faEnvelope} className="h-[34px] w-[34px] mx-auto mt-10 lg:ml-7" />
                        <div>
                            <p className="text-[12px] text-side leading-5 text-center mt-3">
                                Well reply within<br />
                                five business days
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <FontAwesomeIcon icon={faLocationDot} className="h-[34px] w-[34px] mx-auto mt-10  lg:ml-12" />
                        <div>
                            <p className="text-[12px] text-side leading-5 text-center mt-3">
                                Find Nike retail stores near you
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
