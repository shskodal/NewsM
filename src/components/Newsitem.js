import React, { Component } from 'react'

export class Newsitem extends Component {
    
    render() {
        let {title,description,iUrl,inurl,author,publishedat}=this.props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={iUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="badge badge-pill badge-danger">Danger</span></h5>
                       
                        <p className="card-text">{description}....</p>
                        <p className="card-text"><small className="text-muted">By {author===null?"Unkown":author}  {new Date(publishedat).toGMTString()}</small></p>
                        <a href={inurl} target='_blank' className="btn btn-primary">Read More</a>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Newsitem
