import { useParams } from "react-router-dom";

const CryptoItem = () => {
  let { id } = useParams();

  return (
    <div>
      <p>This is the CryptoItem component. The id is {id}</p>
    </div>
  );
};

export default CryptoItem;
