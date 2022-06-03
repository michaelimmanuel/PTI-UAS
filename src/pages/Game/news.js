
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const News = ()=>{
    const [newsApi, setNewsApi] = useState([]);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);
    let arr = data;
    
    async function fetchData(){
        const base_url = "https://newsapi.org/v2/everything?q=mahasiswa&apiKey=1a8e65c509a54eff80a113fc719ccb21";
        try {
            const result = await axios.get(base_url);
            if(result.status === 200){
                setNewsApi(result.data.articles);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData().then(()=>{
            setStart(true);
        });
    }, []);

    useEffect(()=>{
        
        if (start && index < newsApi.length){

            if(arr.length < 1){
                setData([...arr, newsApi[index]]);
                setIndex(index + 1);
            }else{


            var newsInterval = setInterval(()=>{
                arr.push(newsApi[index]);
                setData(arr);
                setIndex(index + 1);
            }, 30000);
        }
        }
        else{
            clearInterval(newsInterval);
        }
        console.log(data);
        return ()=> clearInterval(newsInterval);
    }, [start, index, newsApi]);

    function render(){
        if (data.length === 0){
            return "Loading..."
        }
        else{
            return data[data.length-1]
        }
    }

    return(
        <div className="container">
            <div className="row">
                <p>{render().title}</p>
                <p>{render().author}</p>
                <p>{render().content}</p>
            </div>
        </div>
    )
}

export default News;
