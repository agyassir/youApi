
import { useLocation,useParams } from 'react-router-dom';
import Wallets from '../components/wallet';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Wallet() {
    const { id } = useParams();
    
    return(
  <div className='bg-gray-900'>
  <Header />
<Wallets id={id} />
<Footer/>
  </div>
)}