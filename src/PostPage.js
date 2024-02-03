import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete, deletedposts }) => {
 
    const { id } = useParams();
    const post = posts.find((post) => {
            if(post.id.toString() === id)
                return post;
    });
    

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`http://localhost:3000/edit/${post.id}`}>
              <button className="editButton">Edit post</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete post
            </button>
          </>
        )}

       

        {!post  && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
