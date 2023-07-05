import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async (url) => {
        setIsLoding(true);
        try {
            const response = await axios.get(url);
                setData(response.data);
                setFetchError(null);
        } catch (err) {
                setFetchError(err.message);
                setData([]);
            } finally {
        setIsLoding(false);
      }
    };
    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp();
  }, [dataUrl]);
  return { data, fetchError, isLoding };
};

export default useAxiosFetch;
