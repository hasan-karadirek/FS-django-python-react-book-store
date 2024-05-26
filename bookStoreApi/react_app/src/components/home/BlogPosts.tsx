import React, { useState, useRef, useEffect } from "react";
import "../CSS/BlogPosts.css";
import { Slide, Zoom } from "react-awesome-reveal";
import useFetch from "../../hooks/useFetch";
import { Post } from "../../types/models";
import { Circles } from "react-loader-spinner";
import useWindowSize from "../../hooks/useWindowSize";

const PostDisplay: React.FC = () => {
  const [response, setResponse] = useState<Post[] | null>(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/blog/get-posts/",
    (res) => {
      setResponse(res.data as Post[]);
    },
  );
  const { width } = useWindowSize();

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
  ) : (
    <div className="blog-posts-container" id="blog-posts">
      <div className="blog-posts mt-4 d-flex flex-column flex-lg-row">
        {isLoading ? (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{ padding: "2rem", justifyContent: "center" }}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <>
            <Zoom triggerOnce={true}>
              <div
                className="flex-grow-1"
                style={{ width: `${width > 992 ? "50vw" : "100%"}` }}
              >
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
              style={{ maxHeight: imageHeight }}
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
          </>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
