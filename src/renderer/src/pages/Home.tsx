import React, {useEffect} from "react"
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react";
import {ButtonGroup} from "@/components/ui/button-group";
import {useTitle} from "../../context/TitleContext";

const Home = () => {

  const{setTitle} = useTitle();

  useEffect(()=>{
    setTitle('Dashboard')
  }, [setTitle]);
  return(
      <div>Home</div>
  )
}

export default Home