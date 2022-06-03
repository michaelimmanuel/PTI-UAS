import { useParams } from "react-router-dom";
import {Box} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import "./final.scss";

const Final = () => {
  let { sleep, study, hunger, game } = useParams();
  const [loading, setLoading] = useState(true);
  function render(){
    if (sleep < 7){
      return <h1>Anda hanya tidur sebanyak {sleep} kali dalam seminggu.<br /> Anda harus tidur lebih banyak<br/>Jaga kesehatan anda</h1>
    }
    else if(study < 15){
      return <h1> Anda hanya belajar sebanyak {study} kali dalam seminggu.<br/> Anda harus belajar lebih banyak <br /> Mungkin dapat dipertimbangkan untuk pindah jurusan</h1>
    }
    else if(hunger < 21){
      return (
        <h1>
          {" "}
          Anda hanya makan sebanyak {hunger} kali dalam seminggu.
          <br /> Anda harus makan lebih banyak<br />
          Supaya anda tidak sakit
        </h1>
      );
    }
    else if(game < 21){
      return (
        <h1>
          {" "}
          Anda hanya main game sebanyak {game} kali dalam seminggu.
          <br /> Anda harus main game lebih banyak<br/>Supaya tidak Stress
        </h1>
      );
    }
    else{
      return <h1>Selamat, Performa anda sudah baik</h1>
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  console.log(sleep, study, hunger, game);
  return (
    <div className="final">
      {loading ? (
        <img
          className="loading"
          src={require("../../img/loading.gif")}
          alt=""
        />
      ) : (
        <Box>
          <div className="finalDecor">
            {render()}
            <p>Jumlah Tidur : {sleep}</p>
            <p>Jumlah Belajar :{study}</p>
            <p>Jumlah Makan :{hunger}</p>
            <p>Jumlah Bermain : {game}</p>
          </div>
          <img
            className="background"
            src="https://wallpaperaccess.com/full/772411.jpg"
            alt=""
          />
        </Box>
      )}
    </div>
  );
};

export default Final;
