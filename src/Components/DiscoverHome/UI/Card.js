import './Card.css'
const Card = (props) => {
    const tempYear = props.release_date;
    let year = tempYear[0] + tempYear[1] + tempYear[2] + tempYear[3];
    return (
       <div className="card">
           <div className="image">
               <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${props.url}`} alt={props.url}/>
           </div>
           <div className="title">
               <h2 className="sub-title">{props.title}</h2>
               <h4>{props.vote_average}/10 <span>|</span> {year}</h4>
           </div>
       </div> 
    )
}

export default Card;