import React, { useState, useRef, useEffect } from "react";
import "./CSS/BlogPosts.css";
import image1 from "../assets/books2.jpeg"
import { Slide, Zoom } from "react-awesome-reveal";
import useFetch from "../hooks/useFetch";



type Post = {
  id: number;
  title: string;
  content: string;
  image:string;
};



const PostDisplay: React.FC = () => {
  const [response,setResponse] = useState<Post[] | null>(null)
  const {isLoading,error,performFetch,cancelFetch}=useFetch("/blog/get-posts/",(res)=>{
    setResponse(res.data as Post[])
    setActivePost(response[0])
  })

  useEffect(()=>{
    performFetch({method:"GET"})
  },[])
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  }, [activePost]);


  return (
    <div className="blog-posts-container">
      <div className="blog-posts mt-4 d-flex flex-column flex-lg-row">
      <Zoom triggerOnce={true}>
        <div className="flex-grow-1" style={{ flexBasis: "55%" }}>
        
          <img
            ref={imageRef}
            onLoad={() => setImageHeight(imageRef.current?.clientHeight || 0)}
            src={image1}
            className="blog-post-img"
            alt={`Active post: ${activePost?.title}`}
          />
         
        </div>
        </Zoom>
        <div
          className="d-flex flex-column flex-grow-1 overflow-auto"
          style={{ flexBasis: "40%", maxHeight: imageHeight }}
        >
           <Slide triggerOnce={true}>
          <div className="accordion" id="accordion-posts">
            {response?.map((post) => (
              <div
                key={post.id}
                className={"accordion-item"}
                onClick={() => setActivePost(post)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${activePost?.id === post.id ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${post.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse-${post.id}`}
                  >
                    {post.title}
                  </button>
                </h2>
                <div
                  id={`collapse-${post.id}`}
                  className={`accordion-collapse collapse ${activePost?.id === post.id ? "show" : ""}`}
                  data-bs-parent="#accordion-posts"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content }} className="accordion-body"></div>
                </div>
              </div>
            ))}
          </div>
          </Slide>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
