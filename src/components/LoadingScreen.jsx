
import { useEffect } from "react";

export default function LoadingScreen({loading}){
  useEffect(() => {
    const loadingScreen = document.querySelector('.loading-screen');

    if(loading){
      loadingScreen.showModal();
    } else {
      loadingScreen.close();
    }

  }, [loading])
  return <dialog className='loading-screen'>
    <h2>Loading... <span className="loading-icon">X</span></h2>
  </dialog>
}
