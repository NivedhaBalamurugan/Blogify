import {FaLaptop , FaMobileAlt} from 'react-icons/fa';


const Header = ({ title ,width}) => {

    

    return (
        <header className="Header">
            <h1>{title}</h1>
            {   width < 768 ? <FaMobileAlt /> 
                          :  width < 992  ?  <FaLaptop />
                                          :   <FaLaptop />
            } 
        </header>
    )
}

export default Header