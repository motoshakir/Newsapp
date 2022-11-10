
import React from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';




const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, fun } = props;  // destruction

  const { speak, cancel, speaking, voices } = useSpeechSynthesis()


  const fun1 = (() => {
    if (!speaking)
      speak({ text: "  "+title + description, voice: voices[4] })
    else
      cancel();
  })




  // const fun = async () => {
  //   const formdata = new FormData();
  //   formdata.append("key", "bd254349215b44ab56143b67049f9405");
  //   formdata.append("url", newsUrl);
  //   formdata.append("sentences", "6");

  //   const requestOptions = {
  //     method: 'POST',
  //     body: formdata,
  //     redirect: 'follow'
  //   };

  //   // try {
  //     // const response = await fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions)
  //     // let parsedData = await response.json()

  //     // setData({esummary: parsedData.summary});
  //     //console.log(parsedData.summary);
  //     setValue("kya ho rha hai");
  //     console.log("kikiii"); 
  //   // } catch (error) {
  //   //   console.log('error', error);
  //   // } 

  // }




  return (
    <div className='my-3'>
      <div className="card h-100">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: "absolute", right: '0' }}>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
        </div>

        <img className="card-img-top" src={imageUrl !== null ? imageUrl : "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80 "} alt="..." />
        <div className="card-body">

          <h5 className="card-title ">{title}</h5>
          <p className="card-text">{description}</p>

          <p className="card-text" ><small className="text-danger font-weight-bold">By {author ? author : "Unkown"} on {new Date(date).toGMTString()}</small></p>
          <div className="card-footer row justify-content-between">
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-small btn-dark">read more</a>
            {/* <button className="mx-2" onClick={(fun)}>click</button> */}
            <i class="fa-solid fa-volume-high mt-2" onClick={fun1}></i>
            <div >
              <button type="button" class="btn btn-primary" onClick={() => { fun({ newsUrl, title }) }}>summary</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Newsitem