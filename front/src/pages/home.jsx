import Footer from "../components/footer";
import Header from "../components/header";
import { Homes } from "../components/home";
import { useNavigate, Link } from 'react-router-dom';


export default function Home() {
    
    const navigate = useNavigate();

    if(localStorage.getItem('tocken')==null){
      navigate('/login');  
    }
    return (
        <div className="py-2 bg-gray-900">
            <Header/>
            <Homes/>
            <Footer/>
        </div>
    );
}
