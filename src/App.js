import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

function App() {

    const [posts, setPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    // const searchQuery = searchParams.get('filter') || '';

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(value => value.json())
            .then(value => setPosts(value));
    }, [])


    return (
        <div>
            <form>
                <input
                    //value={searchParams.get('filter') || ''}
                    onChange={(event) => {
                        let filter = event.target.value;
                        if(filter){
                            setSearchParams( {filter} );
                        }else {
                            setSearchParams( {} );
                        }
                    }}
                />
            </form>
            {
                posts
                    .filter((post) => {
                        let filter = searchParams.get("filter");
                        if (!filter) return true;
                        let title = post.title.toLowerCase();
                        return title.includes(filter.toLowerCase());
                    })
                    .map((post) => (
                        <h3 key={post.id}>{post.title}</h3>
                    ))
            }
        </div>
    );
}

export default App;