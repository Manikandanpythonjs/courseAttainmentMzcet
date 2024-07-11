import './Sidebar.scss';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaUserAlt, FaClipboard } from 'react-icons/fa';
import { MdAddTask, MdDateRange, MdDashboard } from 'react-icons/md';
import { BiMessageRoundedDots, BiTimeFive, BiMenuAltRight } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiSettingsFill, RiLogoutCircleFill } from 'react-icons/ri';
import { useState } from 'react';
import { motion } from "framer-motion";
import { GrPlan, GrNotes } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline } from "react-icons/io5";
import { Box } from '@chakra-ui/react';
import Cookies from 'js-cookie';

// import { signOut } from "firebase/auth";
// import { auth } from '../../../utils/Firebase.js'
const Sidebar = () => {
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    const isLogout = () => {
        Cookies.remove("loggedIn")
        localStorage.removeItem("loggedIn")

        // signOut(auth)
        navigate('/login', { replace: true })


    }

    return (

        <motion.div animate={{ width: isOpen ? '200px' : '75px' }} style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }} className="sidebar">
            <Box >
                <section className="top-section">
                    {isOpen && <span className="logo font-semibold" >MZCET</span>}

                    <BiMenuAltRight cursor='pointer' color='#fff' size={30} onClick={toggle} />
                </section>

                <section className="middle-section">

                    <ul>
                        <li>
                            {/* <Link to='/home' style={{ textDecoration: 'none' }}> */}
                            <Link to={'/home'} className='flex items-center justify-between'>
                                <AiTwotoneHome className='icons' size={isOpen ? '18px' : '23px'} />
                                {isOpen &&
                                    <span>Home</span>}
                                {/* </Link> */}
                            </Link>


                        </li>



                        <li onClick={isLogout}>

                            {/* <Link to='/signin' style={{ textDecoration: 'none' }}> */}
                            <RiLogoutCircleFill className='icons' size={isOpen ? '18px' : '23px'} />

                            {isOpen && <span >Logout</span>}
                            {/* </Link> */}

                        </li>
                    </ul>
                </section>
                <section className="bottom-section">

                </section>
            </Box>


        </motion.div>
    )

}

export default Sidebar;