import React, { useEffect, useState } from "react";
import axios from 'axios'

function Home() {

    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, status } = await axios.get('')
                if(status === 200) setPost(data)
            } catch (error) {
        console.log(error);
        }
        }
        fetchPost();
    }, [])
    return(
        <div>
            Home
            {post.map(item => (
                <div key={item._id}>
                    <p>{item.entreprise}</p>
                </div>
            ))}
        </div>
    )
}

export default Home