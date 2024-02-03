import { useParams, Link } from "react-router-dom";

const PostPage = ({  handlePermDelete, deletedposts,handleRestore }) => {
 
    const { id } = useParams();
   
     const delpost = deletedposts.find((post) => {
        if(post.id.toString() === id)
            return post;
    });


  return (
    <main className="PostPage">
      <article className="post">
        
        {delpost && (
          <>
            <h2>{delpost.title}</h2>
            <p className="postDate">{delpost.datetime}</p>
            <p className="postBody">{delpost.body}</p>

            <button className="deleteButton" onClick={() => handleRestore(delpost.id)}>
              Restore
            </button>
            <button className="deleteButton" onClick={() => handlePermDelete(delpost.id)}>
              Delete 
            </button>
          </>
        )}

        { !delpost && (
          <>
            <h4>No posts found!!!</h4>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
