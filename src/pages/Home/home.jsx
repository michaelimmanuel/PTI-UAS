import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  VStack,
  HStack
} from "@chakra-ui/react";
import React, { useState, useEffect, createContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import charData from "../charData";
import "../Home/home.scss";

const jurusan = ["Informatika", "Sistem Informasi", "DKV"];

const PopUp = (props) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <Button onClick={() => props.trigger(false)} className="close-btn">
          X
        </Button>
        {props.children}
        <div className="popup-description">
          <h1>Try Hard Team</h1>
          <Flex>
            <VStack>
              <HStack>
                <img className="popup-image" src={require("./img/Koong.png")} />
                <p className="popup-text">Koong Hiap (00000055136)</p>
              </HStack>
              <HStack>
                <img className="popup-image" src={require("./img/Mikel.png")} />
                <p className="popup-text">
                  Michael Immanuel Herijanto (00000054631)
                </p>
              </HStack>
              <HStack>
                <img
                  className="popup-image"
                  src={require("./img/Krisen.png")}
                />
                <p className="popup-text">
                  Christsen Alston Angello (00000053444)
                </p>
              </HStack>
              <HStack>
                <img className="popup-image" src={require("./img/Wahyu.png")} />
                <p className="popup-text">
                  Wahyu Dwi Setio Wibowo (00000055320)
                </p>
              </HStack>
            </VStack>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export const UserContext = createContext();

const Home = () => {
  const [arr, setArr] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  const history = useHistory();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const [count, setCount] = useState(0);
  const increase = () => {
    if (count + 1 > charData.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };
  const decrease = () => {
    if (count - 1 < 0) {
      setCount(charData.length - 1);
    } else {
      setCount(count - 1);
    }
  };

  const onSubmit = (e) => {
  
    console.log(e.jurusan);
    history.push(`game/${count}/${e.jurusan}/${jurusan[e.jurusan]}/${e.name}`);
  };

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

return (
  <div className="home">
    {loading ? (
      <img className="loading" src={require("../../img/loading.gif")} alt="" />
    ) : (
      <div>
          <Box className="content">
            <h1 class="please">
              <span class="title-word title-word-1">Please </span>
              <span class="title-word title-word-2">Choose </span>
              <span class="title-word title-word-3">Your </span>
              <span class="title-word title-word-4">Character</span>
            </h1>

            <Flex align="center" justify="center">
              <div>
                <button class="buttonkiri" onClick={increase}>
                  <MdOutlineKeyboardArrowLeft />
                </button>
              </div>
              <img className="character" src={charData[count][1]} alt="char" />
              <div>
                <button className="buttonkanan" onClick={decrease}>
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </Flex>
            <div className="box">
              <form className="formCustom">
                <FormControl isInvalid={errors.name}>
                  <FormLabel className="h2">Name</FormLabel>
                  <input
                    class="formnama"
                    {...register("name", {
                      required: { value: true, message: "Nama Harus diisi" },
                    })}
                  />
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <select class="formjurusan" {...register("jurusan")}>
                    {jurusan.map((jurusan, index) => (
                      <option value={index}>{jurusan}</option>
                    ))}
                  </select>
                </FormControl>
                <VStack mt="20px" gap={4}>
                  <Button
                    class="button"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                  <Button class="button" onClick={() => setButtonPopup(true)}>
                    About Us
                  </Button>
                  {buttonPopup === true && (
                    <PopUp trigger={(e) => setButtonPopup(e)} />
                  )}
                </VStack>
              </form>
            </div>
          </Box>

          <img
            className="background"
            src="https://wallpaperaccess.com/full/772411.jpg"
            alt=""
          />
      </div>
    )}
  </div>
);
};

export default Home;


