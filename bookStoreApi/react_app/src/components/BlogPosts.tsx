import React, { useState, useRef, useEffect } from "react";
import "./CSS/BlogPosts.css";
import { Slide, Zoom } from "react-awesome-reveal";
import useFetch from "../hooks/useFetch";

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
};

const PostDisplay: React.FC = () => {
  const [response, setResponse] = useState<Post[] | null>(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/blog/get-posts/",
    (res) => {
      setResponse(res.data as Post[]);
    },
  );

  useEffect(() => {
    performFetch({ method: "GET" });

    return () => {
      if (response) {
        cancelFetch();
      }
    };
  }, []);
  useEffect(() => {
    setActivePost(response ? response[0] : null);
  }, [response]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  }, [activePost]);

  return error ? (
    <p>{error.message}</p>
  ) : isLoading ? (
    <p>loading</p>
  ) : (
    <div className="blog-posts-container">
      <div className="blog-posts mt-4 d-flex flex-column flex-lg-row">
        <Zoom triggerOnce={true}>
          <div className="flex-grow-1" style={{ flexBasis: "55%" }}>
            {activePost ? (
              <img
                ref={imageRef}
                onLoad={() =>
                  setImageHeight(imageRef.current?.clientHeight || 0)
                }
                src={`http://localhost:8000${activePost?.image}`}
                className="blog-post-img"
                alt={`Active post: ${activePost?.title}`}
              />
            ) : (
              <></>
            )}
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
                    <div
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="accordion-body"
                    ></div>
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
