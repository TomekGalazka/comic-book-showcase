import { useState, useEffect } from "react";

function UserReviews({ nick, goBack }) {
    const [userComments, setUserComments] = useState("")
    const getComments = async () => {
        const response = await fetch('http://localhost:5000/comments');
        const data = await response.json();
        setUserComments(data.filter(comment => comment.user === nick))
    }
    useEffect(() => {
        getComments()
    }, [])


    return (<div>
        <div className="back_arrow" onClick={() => goBack()}>&#8249;</div>
        <div id="your_reviews">Your Reviews</div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        {[...userComments].map(comment => (
            <div key={comment.id} className="user_comment_container">
                <div className="comment_top">
                    <div className="comment_title">{comment.title} </div>
                    <div className="user_comment_time"> {comment.date ? comment.date.slice(0, 10) : ""} {comment.date ? comment.date.slice(11, 19) : ""} </div>
                    <div id="user_comment_stars">{[1, 2, 3, 4, 5].map(el => (
                        el > comment.stars ? (<div id={el}
                            key={el}
                            style={{ color: "grey" }}
                            className="fa fa-star"></div>) :
                            (<div id={el}
                                key={el}
                                style={{ color: "orange" }}
                                className="fa fa-star"></div>)
                    ))}</div>
                </div>
                <div className="user_comment_content">{comment.commentContent}</div>
            </div>
        ))}</div>)
}
export default UserReviews