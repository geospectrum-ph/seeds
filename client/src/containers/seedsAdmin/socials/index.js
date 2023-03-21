import React, {useState, useEffect}  from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

export default function Domains() {
  // Get All Domains
  const [domain, setDomain] = useState([])
  const getDomains = async () => {
    try{
      const domains = await axios.get("http://ec2-52-90-134-187.compute-1.amazonaws.com/metadata/getdomainssocial");
      setDomain(domains.data);    
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect (() => {
    getDomains();
  }, []);
 
  return (
    <>
      <Button onClick="" variant="outlined" style={{marginBottom:20}}>Domains</Button>
    </>
  );
}
