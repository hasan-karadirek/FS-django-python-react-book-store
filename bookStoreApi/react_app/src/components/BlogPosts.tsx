import React, { useState, useRef, useEffect } from "react";
import "./CSS/BlogPosts.css";
import image1 from "../assets/books2.jpeg"


// Define the Post type
type Post = {
  id: number;
  title: string;
  desc: string;
};

// Sample data for posts
const posts: Post[] = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    desc: String.raw`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra vitae leo et sollicitudin. Nulla ut sagittis ante. Sed dolor dolor, mattis non dolor et, tincidunt tempor odio. Cras facilisis porta libero, rutrum vehicula libero dapibus eu. Nullam blandit ut tellus vitae hendrerit. Ut eget iaculis eros, a mollis enim. Aliquam fermentum dui ac est pharetra porttitor. Sed pharetra in massa sit amet hendrerit. Maecenas semper tristique dui id cursus. Aenean tincidunt posuere lacus, ac condimentum mi lacinia id. Nulla mollis lectus eu tortor viverra, fringilla aliquet felis molestie. Phasellus in sagittis ligula, quis congue diam. Quisque dictum nulla eu mattis placerat. Nulla facilisi.</p>

    <p>Curabitur porttitor, tellus quis sagittis consequat, risus est faucibus ipsum, et sodales massa purus id metus. Nulla ut tincidunt justo. Nullam tincidunt enim rutrum nunc mattis fringilla. Mauris interdum venenatis nunc, nec elementum turpis congue et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor ut sapien sit amet consequat. Sed sit amet tellus sit amet nisi fermentum molestie. Donec vestibulum suscipit nibh non scelerisque. Suspendisse ultricies ex fermentum metus sagittis fermentum. Nulla aliquam fringilla mauris.</p>`,
      
  },
  {
    id: 2,
    title: "Curabitur porttitor, tellus quis sagittis consequat, risus est ",
    desc: String.raw`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra vitae leo et sollicitudin. Nulla ut sagittis ante. Sed dolor dolor, mattis non dolor et, tincidunt tempor odio. Cras facilisis porta libero, rutrum vehicula libero dapibus eu. Nullam blandit ut tellus vitae hendrerit. Ut eget iaculis eros, a mollis enim. Aliquam fermentum dui ac est pharetra porttitor. Sed pharetra in massa sit amet hendrerit. Maecenas semper tristique dui id cursus. Aenean tincidunt posuere lacus, ac condimentum mi lacinia id. Nulla mollis lectus eu tortor viverra, fringilla aliquet felis molestie. Phasellus in sagittis ligula, quis congue diam. Quisque dictum nulla eu mattis placerat. Nulla facilisi.</p>

    <p>Curabitur porttitor, tellus quis sagittis consequat, risus est faucibus ipsum, et sodales massa purus id metus. Nulla ut tincidunt justo. Nullam tincidunt enim rutrum nunc mattis fringilla. Mauris interdum venenatis nunc, nec elementum turpis congue et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor ut sapien sit amet consequat. Sed sit amet tellus sit amet nisi fermentum molestie. Donec vestibulum suscipit nibh non scelerisque. Suspendisse ultricies ex fermentum metus sagittis fermentum. Nulla aliquam fringilla mauris.</p>`,
      
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    desc: String.raw`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra vitae leo et sollicitudin. Nulla ut sagittis ante. Sed dolor dolor, mattis non dolor et, tincidunt tempor odio. Cras facilisis porta libero, rutrum vehicula libero dapibus eu. Nullam blandit ut tellus vitae hendrerit. Ut eget iaculis eros, a mollis enim. Aliquam fermentum dui ac est pharetra porttitor. Sed pharetra in massa sit amet hendrerit. Maecenas semper tristique dui id cursus. Aenean tincidunt posuere lacus, ac condimentum mi lacinia id. Nulla mollis lectus eu tortor viverra, fringilla aliquet felis molestie. Phasellus in sagittis ligula, quis congue diam. Quisque dictum nulla eu mattis placerat. Nulla facilisi.</p>

    <p>Curabitur porttitor, tellus quis sagittis consequat, risus est faucibus ipsum, et sodales massa purus id metus. Nulla ut tincidunt justo. Nullam tincidunt enim rutrum nunc mattis fringilla. Mauris interdum venenatis nunc, nec elementum turpis congue et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor ut sapien sit amet consequat. Sed sit amet tellus sit amet nisi fermentum molestie. Donec vestibulum suscipit nibh non scelerisque. Suspendisse ultricies ex fermentum metus sagittis fermentum. Nulla aliquam fringilla mauris.</p>`,
      
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    desc: String.raw`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra vitae leo et sollicitudin. Nulla ut sagittis ante. Sed dolor dolor, mattis non dolor et, tincidunt tempor odio. Cras facilisis porta libero, rutrum vehicula libero dapibus eu. Nullam blandit ut tellus vitae hendrerit. Ut eget iaculis eros, a mollis enim. Aliquam fermentum dui ac est pharetra porttitor. Sed pharetra in massa sit amet hendrerit. Maecenas semper tristique dui id cursus. Aenean tincidunt posuere lacus, ac condimentum mi lacinia id. Nulla mollis lectus eu tortor viverra, fringilla aliquet felis molestie. Phasellus in sagittis ligula, quis congue diam. Quisque dictum nulla eu mattis placerat. Nulla facilisi.</p>

    <p>Curabitur porttitor, tellus quis sagittis consequat, risus est faucibus ipsum, et sodales massa purus id metus. Nulla ut tincidunt justo. Nullam tincidunt enim rutrum nunc mattis fringilla. Mauris interdum venenatis nunc, nec elementum turpis congue et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor ut sapien sit amet consequat. Sed sit amet tellus sit amet nisi fermentum molestie. Donec vestibulum suscipit nibh non scelerisque. Suspendisse ultricies ex fermentum metus sagittis fermentum. Nulla aliquam fringilla mauris.</p>`,
      
  },
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
    <div className="blog-posts-container">
      <div className="blog-posts mt-4 d-flex flex-column flex-lg-row">
        <div className="flex-grow-1" style={{ flexBasis: "55%" }}>
          <img
            ref={imageRef}
            onLoad={() => setImageHeight(imageRef.current?.clientHeight || 0)}
            src={image1}
            className="blog-post-img"
            alt={`Active post: ${activePost.title}`}
          />
        </div>
        <div
          className="d-flex flex-column flex-grow-1 overflow-auto"
          style={{ flexBasis: "40%", maxHeight: imageHeight }}
        >
          <div className="accordion" id="accordion-posts">
            {posts.map((post) => (
              <div
                key={post.id}
                className={"accordion-item"}
                onClick={() => setActivePost(post)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${activePost.id === post.id ? "" : "collapsed"}`}
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
                  className={`accordion-collapse collapse ${activePost.id === post.id ? "show" : ""}`}
                  data-bs-parent="#accordion-posts"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.desc }} className="accordion-body"></div>
                </div>
              </div>
            ))}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
