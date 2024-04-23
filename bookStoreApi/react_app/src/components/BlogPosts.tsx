import React, { useState,useRef,useEffect } from 'react';
import "./CSS/BlogPosts.css"

// Define the Post type
type Post = {
    id: number;
    title: string;
    imageUrl: string;
    desc: string;
};

// Sample data for posts
const posts: Post[] = [
    { id: 1, title: 'Post One Post One Post One Post One Post One Post One Post One Post One Post One ', imageUrl: 'https://via.placeholder.com/150', desc: "desc 1 desc 1 desc 1 desc 1 desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1" },
    { id: 2, title: 'Post Two', imageUrl: 'https://via.placeholder.com/180', desc: "desc 2 desc 2 desc 2 desc 2" },
    { id: 3, title: 'Post Three', imageUrl: 'https://via.placeholder.com/240', desc: "desc 3 desc 3 desc 3 desc 3" },
    { id: 4, title: 'Post One', imageUrl: 'https://via.placeholder.com/150', desc: "desc 1 desc 1 desc 1 desc 1 desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1" },
    { id: 5, title: 'Post Two', imageUrl: 'https://via.placeholder.com/150', desc: "desc 2 desc 2 desc 2 desc 2" },
    { id: 6, title: 'Post Three', imageUrl: 'https://via.placeholder.com/150', desc: "desc 3 desc 3 desc 3 desc 3" },
    { id: 7, title: 'Post One', imageUrl: 'https://via.placeholder.com/150', desc: "desc 1 desc 1 desc 1 desc 1 desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1desc 1 desc 1 desc 1 desc 1" },
    { id: 8, title: 'Post Two', imageUrl: 'https://via.placeholder.com/150', desc: "desc 2 desc 2 desc 2 desc 2" },
    { id: 9, title: 'Post Three', imageUrl: 'https://via.placeholder.com/150', desc: "desc 3 desc 3 desc 3 desc 3" }
];

const PostDisplay: React.FC = () => {
   
    const [activePost, setActivePost] = useState<Post>(posts[0]);
    const [imageHeight, setImageHeight] = useState(0);
    const imageRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.clientHeight);
        }
    }, [activePost]);
    return (
        <div className='blog-posts-container'>
        <div className="blog-posts mt-4 d-flex">
            
            <div className="flex-grow-1" style={{ flexBasis: '55%' }}>

                <img ref={imageRef}
                    onLoad={() => setImageHeight(imageRef.current?.clientHeight || 0)}
                    src={activePost.imageUrl} className="blog-post-img" alt={`Active post: ${activePost.title}`} />


            </div>
            <div className="d-flex flex-column flex-grow-1 overflow-auto" style={{ flexBasis: '40%', maxHeight:imageHeight }}>
                <div className="accordion" id="accordion-posts">
                    {posts.map(post => (
                        <div
                            key={post.id}
                            className={`accordion-item`}
                            onClick={() => setActivePost(post)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h2 className="accordion-header">
                                <button className={`accordion-button ${activePost.id === post.id ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${post.id}`} aria-expanded="true" aria-controls={`collapse-${post.id}`}>
                                    {post.title}
                                </button>
                            </h2>
                            <div id={`collapse-${post.id}`} className={`accordion-collapse collapse ${activePost.id===post.id ? "show":""}`} data-bs-parent="#accordion-posts">
                                <div className="accordion-body">
                                    {post.desc}
                                </div>
                            </div>

                        </div>
                    ))}

                </div>


                <div>


                </div>
            </div>
        </div>
        </div>
    );
};

export default PostDisplay;
