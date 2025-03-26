import React from 'react';

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                console.log(response);

            } catch (error) {
                console.log(error);
            }
        }

    }, []);

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;