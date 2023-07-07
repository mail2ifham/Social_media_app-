import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {

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
        setTimeout(() => setIsLoding(false), 2000);
      }
    };
    fetchData(dataUrl);

  }, [dataUrl]);
  return { data, fetchError, isLoding };
};

export default useAxiosFetch;
