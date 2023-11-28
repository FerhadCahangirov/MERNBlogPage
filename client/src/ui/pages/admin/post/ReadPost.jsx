import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const Post = () => {

    const { postId } = useParams();
    const [paragraphs, setParagraphs] = useState([]);
    const [title, setTitle] = useState("");
    const [createdDate,setCreatedDate] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/posts/find/${postId}`).then(
            response => {
                response.json().then(postData => {
                    setParagraphs(postData.post.paragraphs);
                    setTitle(postData.post.title);
                    setDescription(postData.post.description);
                    setCreatedDate(postData.post.createdDate);
                    setImageUrl(postData.post.imageUrl);
                    setUsername(postData.user.username);
                })
            }
        )
    }, [paragraphs, title, description]);

    const _createdDate = new Date(createdDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = _createdDate.toLocaleDateString('en-US', options);

    return (
        <div className="card mb-3 mt-3">
            {imageUrl &&
                    <>
                        <img src={imageUrl} className="card-img img-fluid" style={{ minWidth: "fitContent" }} />
                    </>}

            <div className="card-body">

                <h3 className="card-title fw-bold">{title}</h3>
                <p className="card-text fw-bold">{description}</p>

                {
                    paragraphs && paragraphs.map(paragraph => {
                        return (
                            <>
                                <h5 className="card-title">{paragraph.title}</h5>
                                <p className="card-text">{paragraph.text}</p>
                            </>
                        )
                    })
                }
                <h5 className="card-title"></h5>

                <p className="card-text"><small className="text-muted">Posted at {formattedDate} by {username}</small></p>
            </div>
        </div>
    )

}

export default Post