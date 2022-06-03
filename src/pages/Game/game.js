import {useParams, useHistory} from 'react-router';
import charData from "../charData";
import playerData from '../playerData';
import { useState, useEffect} from "react";
import { Button, Box, Progress, Flex, VStack, HStack, Grid, GridItem, Select } from '@chakra-ui/react';
import './game.scss'
import Clock from './clock';
import { useForm } from "react-hook-form"; 
import TicTacToe from "./ticTacToe";
import News from "./news";
import axios from "axios";
import { isDisabled } from '@testing-library/user-event/dist/utils';

let namaHari = ["Minggu","Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let pilihanJam = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];
let matkul = [
  [
    "",
    "Kalkulus",
    "Aljabar Linear",
    "Pengenalan teknologi Internet",
    "Algoritma dan Struktur Data",
    "Engglish 1",
  ],
  [
    "",
    "Pemrograman Web",
    "Dasar Pemrograman",
    "",
    "English 1",
    "Algoritma dan Struktur Data",
  ],
  ["", "Design Web", "", "Engglish 1", "", "Animasi"],
];

const Game = () =>{
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [hungerCounter, setHungerCounter] = useState(1);
  const [sleepCounter, setSleepCounter] = useState(1);
  const [studyCounter, setStudyCounter] = useState(1);
  const [gameCounter, setGameCounter] = useState(1);

  let [pop, setpop] = useState(0);
  let [waktu, setWaktu] = useState("pagi");
  let [hari, setHari] = useState(6);
  let [sleep, setSleep] = useState(50);
  let [hunger, setHunger] = useState(50);
  let [study, setStudy] = useState(0);
  let [game, setGame] = useState(50);
  let [tempat, setTempat] = useState("tempat1");
  let [interv, setInterv] = useState(0);
  let [status, setStatus] = useState(0);
  let [background, setBackground] = useState(`pagi`+ tempat);
  let [clock, setClock] = useState({
    hours: 0,
    minutes: 0,
  });
  let [intervProses, setIntervProses] = useState(0);
  let [salam, setSalam] = useState(0);
  let [handphone, setHandphone] = useState(0);
  let [mati, setMati] = useState(0);
  const [charCondition, setCharCondition] = useState(1);
  const [jumpTo, setJumpTo] = useState(0);
  const [jump, setJump] = useState(0);
  const [uang, setUang] = useState(100);
  const [stokMakan, setStokMakan] = useState(10);
  const [XO, setXO] = useState(0);
  const [weatherApi, setWeatherApi] = useState({ weather: [], temp: "" });
  const [start, setStart] = useState(false);

  async function fetchData() {
    const base_url =
      "https://api.openweathermap.org/data/2.5/weather?lat=-6.258039151422799&lon=106.61737593034856&appid=1d07956c2773b4fd7609e8b841e15ac6&units=metric";
    try {
      const result = await axios.get(base_url);
      if (result.status === 200) {
        console.log(result.data.weather);
        setWeatherApi((prevState) => ({
          weather: result.data.weather,
          temp: result.data.main.temp,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      fetchData().then(() => {
        console.log("updated weather api")
        setStart(true);
      });
  }, []);

  useEffect(() => {
    if (start && weatherApi.weather.length > 0) {
      console.log(weatherApi);
      weatherApi.weather[0].main === "rain" &&
        setBackground(background + "hujan");
    }
  }, [start, weatherApi.weather]);

  useEffect(() => {
    if (status === 0) {
      setInterv(setInterval(run, 1000));
      setIntervProses(setInterval(runProses, 1000));
    }
    if (status === 1) {
      clearInterval(interv);
      clearInterval(intervProses);
    }
  }, [status]);

  let updateHours = clock.hours,
    updateMinutes = clock.minutes;

  const run = () => {
    if (updateHours === 24) {
      updateHours = 0;
      updateMinutes = 0;
      setHari(hari + 1);
    }
    if (updateMinutes === 11) {
      updateHours = updateHours + 1;
      updateMinutes = 0;
    } else {
      updateMinutes++;
    }
    return setClock({ hours: updateHours, minutes: updateMinutes });
  };

  const runProses = () => {
    if ((sleep > 0) && (hunger > 0) && (game > 0)) {
      setSleep((prevSleep) => prevSleep - 0.1);
      setHunger((prevHunger) => prevHunger - 0.5);
      setStudy((prevStudy) => prevStudy - 0.01);
      setGame((prevGame) => prevGame - 0.4);
    }
  }

  useEffect(() => {
    // console.log(clock.hours, clock.minutes);
  }, [clock.hours, clock.minutes]);

  useEffect(() => {
    // console.log(sleep, hunger, study, game);
    if(sleep <= 0 || hunger <= 0 || game <= 0){
      setMati(1);
      setStatus(1);
      let interval = setInterval(() => {
        history.push('/home');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sleep, hunger, study, game]);
  
  useEffect(()=>{
    if (clock.hours >= 10 && clock.hours < 14) {
      setWaktu("siang");
    } else if(clock.hours >= 14 && clock.hours < 18) {
      setWaktu("sore");
    }
    else if (clock.hours >= 18 || clock.hours < 4) {
      setWaktu("malam");
    } else {
      setWaktu("pagi");
    }
  }, [clock.hours]);

  useEffect(()=>{
    setSalam(1);
    let interval = setInterval(() => {
      setSalam(0);
    }, 5000);
    return () => clearInterval(interval);
  },[waktu]);
    
  useEffect(() => {
    if(hari === 7){
      history.push(`/final/${Number(studyCounter)}/${Number(sleepCounter)}/${Number(hungerCounter)}/${Number(gameCounter)}`);
    }
    setBackground(waktu + tempat);
  }, [waktu, tempat, hari]);

  useEffect(() => {
    let interval = setInterval(() => {
      setCharCondition(1);
    }, 2000);
    return () => clearInterval(interval);
  }, [charCondition]);

  useEffect(() => {
    if (jump === 1) {
      setInterv(setInterval(run, 100));
    } if(jump === 0) {
      clearInterval(interv);
    }
  }, [jump]);

  useEffect(() => {
    if(clock.hours === jumpTo ){
      setJump(0);
    }
    // console.log(clock.hours);
  }, [jumpTo, clock.hours])

  const timelapse = () => {
    if (clock.hours !== jumpTo) {
      setJump(1);
      // console.log(jumpTo);
    }
  }

    let {id, jurusan, arr, name} = useParams();
    return (
      <div className={`game`}>
        <Grid
          templateRows="200px 50px"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Clock
              status={status}
              hours={clock.hours}
              minutes={clock.minutes}
            />
          </GridItem>
          <GridItem h="20px" rowSpan={1} colSpan={2} mt="20px">
            <p>Hunger</p>
            <Progress w="100%" max={100} colorScheme="green" value={hunger} />
            <p>Study</p>
            <Progress w="100%" max={100} colorScheme="blue" value={study} />
          </GridItem>
          <GridItem h="20px" rowSpan={1} colSpan={2} mt="20px">
            <p>Happy</p>
            <Progress w="100%" max={100} colorScheme="yellow" value={game} />
            <p>Sleep</p>
            <Progress w="100%" max={100} colorScheme="red" value={sleep} />
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            <HStack justify="center" gap={4}>
              <p>Hari: {namaHari[hari]}</p>
              <p>Uang: ${uang}</p>
              <p>Stok Makanan: {stokMakan}</p>
            </HStack>
          </GridItem>
        </Grid>
        <Box
          justity="center"
          textAlign="center"
          className={`background ${background}`}
        >
          {tempat === "kelas" && (
            <Box fontSize="30px" color="white">
              {matkul[arr][hari]}
            </Box>
          )}

          <Grid
            className="game-display"
            align="center"
            templateRows="1"
            templateColumns="0.5fr 1fr 0.5fr"
            gap={4}
          >
            <GridItem>
              <VStack display="flex">
                <Button class="Game" onClick={() => setTempat("tempat1")}>
                  Rumah
                </Button>
                <Button disabled={(clock.hours < 17 && clock.hours >= 8)?false:true} class="Eat" onClick={() => setTempat("tempat2")}>
                  UMN
                </Button>
                <Button class="Study" onClick={() => setTempat("tempat3")}>
                  Super Market
                </Button>
                <Button class="Sleep" onClick={() => setTempat("tempat4")}>
                  Cafe
                </Button>
              </VStack>
              <Box
                className="relative"
                justify="center"
                onClick={() =>
                  handphone === 0 ? setHandphone(1) : setHandphone(0)
                }
              >
                <img
                  className="handphone"
                  src={require("./img/HP.png")}
                  alt=""
                />
                <Box className="content">
                  <News className="absolute " />
                </Box>
              </Box>
            </GridItem>
            <GridItem align="center" justify="center">
              <img
                className="character"
                src={charData[id][charCondition]}
                alt=""
              />
            </GridItem>
            <GridItem align="center" justify="center">
              {tempat === "tempat1" && (
                <VStack>
                  <Button
                    class="Game"
                    onClick={() => {
                      setCharCondition(5);
                      game < 100 ? setGame(game + 10) : setGame(100);
                      setGameCounter(gameCounter + 1);
                    }}
                  >
                    Game
                  </Button>
                  <Button
                    ml={0}
                    class="Eat"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      setCharCondition(4);
                      setStokMakan(stokMakan - 1);
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                      setHungerCounter(hungerCounter + 1);
                      console.log(hungerCounter);
                    }}
                  >
                    Eat
                  </Button>
                  <Button
                    class="Study"
                    onClick={() => {
                      setCharCondition(2);
                      study < 100 ? setStudy(study + 10) : setStudy(100);
                      setStudyCounter(studyCounter + 1);
                      console.log(studyCounter);
                    }}
                  >
                    Study
                  </Button>
                  <Button
                    class="Sleep"
                    onClick={() => {
                      setStatus(1);
                      setpop(1);
                    }}
                  >
                    Sleep
                  </Button>
                </VStack>
              )}
              {(tempat === "tempat2" ||
                tempat === "kantin" ||
                tempat === "kelas" ||
                tempat === "perpus") && (
                <VStack>
                  <Button class="Eat" onClick={() => setTempat("kantin")}>
                    Kantin
                  </Button>
                  <Button class="Eat" onClick={() => setTempat("kelas")}>
                    Kelas
                  </Button>
                  <Button class="Eat" onClick={() => setTempat("perpus")}>
                    Perpus
                  </Button>
                </VStack>
              )}

              {tempat === "kantin" && (
                <VStack>
                  <Button
                    ml={0}
                    class="Eat"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      setCharCondition(4);
                      setStokMakan(stokMakan - 1);
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                      setHungerCounter(hungerCounter + 1);
                      console.log(hungerCounter);
                    }}
                  >
                    Bekal
                  </Button>
                  <Button
                    class="Eat"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                      game < 100 ? setGame(game + 10) : setGame(100);
                      setHungerCounter(hungerCounter + 1);
                      console.log(hungerCounter);
                      setUang(uang - 3);
                    }}
                  >
                    Nasi Padang $3
                  </Button>
                  <Button
                    class="Eat"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                      setUang(uang - 2);
                      setHungerCounter(hungerCounter + 1);
                      console.log(hungerCounter);
                    }}
                  >
                    Nasi Goreng $2
                  </Button>
                  <Button
                    class="Eat"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                      setUang(uang - 2);
                      setHungerCounter(hungerCounter + 1);
                      console.log(hungerCounter);
                    }}
                  >
                    Indomie $1
                  </Button>
                </VStack>
              )}

              {tempat === "kelas" && (
                <Button
                  class="Study"
                  onClick={() => {
                    setCharCondition(2);
                    setStatus(1);
                    setXO(1);
                    setJumpTo((clock.hours + 2) % 24);
                    timelapse();
                    study < 100 ? setStudy(study + 10) : setStudy(100);
                    setStudyCounter(studyCounter + 1);
                  }}
                >
                  Study
                </Button>
              )}
              {tempat === "perpus" && (
                <Button
                  class="Study"
                  onClick={() => {
                    setCharCondition(2);
                    study < 100 ? setStudy(study + 10) : setStudy(100);
                    setStudyCounter(studyCounter + 1);
                  }}
                >
                  Study
                </Button>
              )}
              {tempat === "tempat3" && (
                <VStack>
                  <Button
                    class="Eat"
                    onClick={() => {
                      setStokMakan(stokMakan + 1);
                      setUang(uang - 1);
                    }}
                  >
                    Indomie $1
                  </Button>
                  <Button
                    class="Eat"
                    onClick={() => {
                      setStokMakan(stokMakan + 1);
                      setUang(uang - 1);
                    }}
                  >
                    Cereal $1
                  </Button>
                  <Button
                    class="Eat"
                    onClick={() => {
                      setHungerCounter(hungerCounter + 1);
                      setStokMakan(stokMakan + 1);
                      setUang(uang - 2);
                    }}
                  >
                    Kentang Goreng $2
                  </Button>
                </VStack>
              )}
              {tempat === "tempat4" && (
                <VStack>
                  <Button
                    ml={0}
                    class="Game"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      setCharCondition(4);
                      setUang(uang - 1);
                      setHungerCounter(hungerCounter + 1);
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                    }}
                  >
                    Nasi Goreng $2
                  </Button>
                  <Button
                    class="Game"
                    onClick={() => {
                      game < 100 ? setGame(game + 10) : setGame(100);
                      setGameCounter(gameCounter + 1);
                    }}
                  >
                    Nongki
                  </Button>
                  <Button
                    class="Game"
                    disabled={stokMakan === 0 ? true : false}
                    onClick={() => {
                      setHungerCounter(hungerCounter + 1);
                      hunger < 100 ? setHunger(hunger + 10) : setHunger(100);
                      setUang(uang - 2);
                    }}
                  >
                    Kopi $2
                  </Button>
                </VStack>
              )}
            </GridItem>
          </Grid>
        </Box>

        {pop ? (
          <div className="popUp">
            <Box className="content">
              <Button
                className="quit"
                type="submit"
                mr={0}
                onClick={() => {
                  setpop(0);
                  setStatus(0);
                  setCharCondition(3);
                }}
              >
                X
              </Button>
              <Clock
                status={status}
                hours={clock.hours}
                minutes={clock.minutes}
              />
              <Box color="white">Tidur Hingga Jam:</Box>
              <Select
                bg="wite"
                w="80px"
                onChange={(e) => setJumpTo(Number(e.target.value))}
              >
                {pilihanJam.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Select>
              <Button
                onClick={() => {
                  timelapse();
                  sleep < 100 ? setSleep(sleep + 10) : setSleep(100);
                  setSleepCounter(sleepCounter + 1);
                  console.log(sleepCounter);
                }}
              >
                jump
              </Button>
            </Box>
          </div>
        ) : null}
        {salam === 1 ? (
          <Box colorScheme="black" className="salam">
            <h1>
              selamat {waktu} {name}
            </h1>
          </Box>
        ) : null}
        {handphone ? (
          <div className="popUpHp">
            <div className="content">
              <p>Weather</p>
              <p>{weatherApi.weather[0].description}</p>
              <p>{weatherApi.temp} C</p>
              <h2>Jadwal Kuliah Jurusan {jurusan}</h2>
              <table border="2px solid black" >
                <tr><td>Hari</td><td>Mata Kuliah</td></tr>
                {namaHari.map((e, index) => <tr><td> {e} </td><td> {matkul[arr][index]} </td></tr> )}
              </table>
            </div>
            <img className="bigHp" src={require("./img/HP.png")} alt="" />
          </div>
        ) : null}
        {mati ? (
          <div className="mati">
            <h1>Game Over</h1>
          </div>
        ) : null}
        {XO ? (
          <div className="XO">
            <Button
              onClick={() => {
                setStatus(0);
                setXO(0);
              }}
            >
              X
            </Button>
            <TicTacToe class="TicTacToe" />
          </div>
        ) : null}
      </div>
    );
}


export default Game;