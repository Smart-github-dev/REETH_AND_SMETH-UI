import axios from 'axios';
import { useEffect, useState } from 'react';

const useCurveEthereumPools = () => {
  const [pools, setPools] = useState([]);
  const [updatePools, setUpdatePools] = useState(0);

  useEffect(() => {
    axios
      .get('https://api.curve.fi/api/getPools/ethereum/main')
      .then((response) => {
        return response.data;
      })
      .then((data) => setPools(data.data.poolData));
  }, [updatePools]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatePools(new Date().getTime());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return pools;
};

export default useCurveEthereumPools;
