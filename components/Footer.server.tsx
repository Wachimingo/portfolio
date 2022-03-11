import { FaFacebookF, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='relative bottom-0 bg-slate-800 text-white text-xl z-50'>
            <div className='inline-block mx-2 mt-4 mb-4'>
                <span className='cursor-pointer hover:bg-white hover:text-black pr-1 pl-1 border border-white mr-2'>
                    <a href="https://www.facebook.com/halex007/" target="_blank">
                        <FaFacebookF className='inline-block' />
                    </a>
                </span>
                <span className='cursor-pointer hover:bg-white hover:text-black pr-1 pl-1 border border-white'>
                    <a href="https://www.linkedin.com/in/joshua-guillen-755143a7/" target="_blank">
                        <FaLinkedinIn className='inline-block' />
                    </a>
                </span>
                <br />
                <span className='text-sm'>
                    <FaRegEnvelope className='inline-block' /> joshua.herrera2@outlook.com
                </span>
            </div>
        </footer>
    )
}

export default Footer;