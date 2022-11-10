import React, {useEffect,useState,useRef} from 'react'

import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropsTypes from 'prop-types'
import { useSpeechSynthesis } from 'react-speech-kit';


const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [Loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  const [value,setValue] = useState("shakir")
  const [title,setTitle] = useState("No Title")
  const ref = useRef(null);
  const { speak, cancel, speaking, voices } = useSpeechSynthesis()
  //document.title = `${this.capitalizeFirstLetter(props.category)} - Aaj Ki Tazza Khabar`;

  const capitalizeFirstLetter= (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fun = async (obj) => {
    const formdata = new FormData();
    formdata.append("key", "bd254349215b44ab56143b67049f9405");
    formdata.append("url", obj.newsUrl);
    formdata.append("sentences", "6");

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions)
      let parsedData = await response.json()
      console.log(parsedData?.summary);
      setValue(parsedData?.summary);
      setTitle(obj.title);
      ref.current.click();
    } catch (error) {
      console.log('error', error);
    } 

  }

  const fun1 = (()=>{
    if(!speaking)
    speak({text : "  "+ title + value, voice: voices[1]})
    else
    cancel();
  })


    
  
  // https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d4625dec819439c91af4c5bbcea7167
   const updateNews= async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=43738a6bccd24bb2a9439ba89602e149&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
   

  }
  useEffect(() => {
    updateNews();
    //eslint-disable-next-line
  },[])

 const handlePreviousClick = async () => {
    // console.log("prev");

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=43738a6bccd24bb2a9439ba89602e149&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json()

    //   console.log(parsedData);

    // this.setState({
    // page: this.state.page - 1,
    // articles: parsedData.articles,
    // loading: false
    // })
    setPage(page - 1 )
    updateNews();

  }

  const handleNextClick = async () => {
    // console.log("next");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=43738a6bccd24bb2a9439ba89602e149&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json()


    // this.setState({
    // page: this.state.page + 1,
    // articles: parsedData.articles,
    // loading: false
    // })

    setPage(page + 1 )
    updateNews();
  }

    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ margin: '30px 0px', marginTop: "90px"}}>Aaj Ki Taaza Khabar - Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
        {Loading && <Spinner />}


        <button ref={ref} type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
                summary
              </button>
             
            
              <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">{title}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={cancel}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>{value}</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={cancel}>Close</button>
                      <i class="fa-solid fa-volume-high mx-3" onClick={fun1}></i>
                    </div>
                    
                  </div>
                </div>
              </div>
             



        <div className="row">
          {!Loading && articles.map((element) => {

            return (<div className="col-md-4" key={element.url}>

              {/* <Newsitem  title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl={element.url} author = {element.author} date ={element.publishedAt}/> */}
              <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} fun = {fun}/>
            </div>)
          })}



          {/* <div className="col-md-4">
        <Newsitem title="mytitle" description ="mydesc"/>
        </div>
        <div className="col-md-4">
        <Newsitem title="mytitle" description ="mydesc"/>
        </div> */}
        </div>

        <div className='container d-flex justify-content-between'>
          <button disabled={page <= 1} type="button" className="btn btn-dark mx-3" onClick={handlePreviousClick}> &larr; previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark mx-3" onClick={handleNextClick}>next &rarr; </button>
        </div>
      </div>
    )
}
  
 

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'

}
News.propTypes = {
  country: PropsTypes.string,
  pageSize: PropsTypes.number,
  category: PropsTypes.string

}


export default News