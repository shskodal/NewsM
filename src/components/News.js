// import React, { Component } from 'react'
// import Newsitem from './Newsitem'
// import PropTypes from 'prop-types'


// export class News extends Component {

// static defaultProps={
//     country:"in",
//     pageSize:5


// }

// static propTypes={
//     country:PropTypes.string,
//     pageSize:PropTypes.number,
//     category:PropTypes.string


// }



//     constructor() {
//         super();
//         this.state = {
//             articles: [],
//             loading: false,
//             page:1,
//             totalresults:0
//         }
//     }

//     async componentDidMount() {
//         this.props.setProgress(10);
//         let link = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`
//         let data = await fetch(link);
//         this.props.setProgress(30);
//         let jsondata = await data.json();
//         this.props.setProgress(70);
//         this.setState({ articles: jsondata.articles ,totalresults:jsondata.totalResults})
//         this.props.setProgress(100)
//     }

//     handlePrevClick =async ()=>{
//         console.log("Previous")
//         let link = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
//         let data = await fetch(link);
//         let jsondata = await data.json();
//         this.setState({ 
//             page:this.state.page -1,
//             articles: jsondata.articles })

//     }

//     handleNextClick = async()=>{
//         console.log("Next")
//         if(this.state.page+1>Math.ceil(this.state.totalresults/this.props.pageSize)){

//         }
//         else{
//         let link = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
//         let data = await fetch(link);
//         let jsondata = await data.json();
//         this.setState({ 
//             page:this.state.page +1,
//             articles: jsondata.articles })}

//     }



//     render() {
//         return (
//             <div>
//                 <div className="container my-3">
//                     <h2 className="text-center">NewSHocK- Top headlines</h2>

//                     <div className="row">
//                         {this.state.articles.map((element) => {
//                             return <div className="col-md-4" key={element.url}>
//                                 <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 81) : ""} iUrl={element.urlToImage} inurl={element.url} author={element.author} publishedat={element.publishedAt}/>
//                             </div>
//                         })}


//                     </div>

//                 </div>

//                 <div className="container d-flex justify-content-between">
//                     <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
//                     <button disabled={this.state.page+1>Math.ceil(this.state.totalresults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
//                 </div>

//             </div>
//         )
//     }
// }

// export default News




import React, {useEffect, useState} from 'react'

import NewsItem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        updateNews(); 
    }, [])
 

    const handlePrevClick = async () => {
        setPage(page-1)
        updateNews();
    }

    const handleNextClick = async () => { 
        setPage(page+1)
        updateNews()
    }

    const fetchMoreData = async () => {   
        setPage(page+1) 
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' ,   margintop: '60px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} iUrl={element.urlToImage} inurl={element.url} author={element.author} publishedat={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
