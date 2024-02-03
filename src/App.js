import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Trash from './Trash';
import Missing from './Missing';
import EditPost from './EditPost';
import DelPostPage from './DelPostPage';  
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import api1 from './api/deletedposts';
import useWindowSize from './hooks/useWindowSize';
//import useAxiosFetch from './hooks/useAxiosFetch';



function App() {

  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('');
  
  const [postTitle, setPostTitle] = useState('');
  
  const [postBody, setPostBody] = useState('');

  const [editTitle, setEditTitle] = useState('');
  
  const [editBody, setEditBody] = useState('');
  
  const navigate = useNavigate();

  const {width} = useWindowSize();  //destructing to pull width

  const [deletedposts, setDeletedPosts] = useState([]);

 // const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');  

 /* useEffect ( () => {
    setPosts(data);
  },[data]);
*/

  useEffect( () => {

    const fetchPost = async () => {
      try {

        const response = await api.get('/posts');
        //console.log(response.data);
        setPosts(response.data);   //come here only if there is no error
       const response1 = await api1.get('/deletedposts'); 
       //console.log(response1.data);
       setDeletedPosts(response1.data);
      
      } catch(err) {

        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else {      // no response itself
        console.log(`error : ${err.message}`);
      }
      }
    }

    //setTimeout(() => fetchPost(),1000);

    fetchPost();

  },[])



  const handleEdit = async (id) => {

    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    console.log(datetime);

    try {

      const response = await api.put(`/posts/${id}`, updatedPost);
      console.log(response);
      const allposts=posts.map((post) => {
        if(post.id === id)
            return response.data;
        else  
            return post;
      })

      setPosts(allposts);
      setEditTitle('');
      setEditBody('');
      navigate('/');

    } catch (err) {

      console.log(`Error: ${err.message}`);
    
    }
  }

  const handleSubmit = async () => {

   
    let lastId = posts.length ? parseInt(posts[posts.length - 1].id) : 0;
    let id = isNaN(lastId) ? 1 : lastId + 1;
    const datetime=format(new Date(), 'MMMM dd, yyyy pp');
      const newpost={id:String(id), title:postTitle, datetime: datetime, body:postBody};
      
      try {
        
        const response = await api.post('/posts',newpost);
          const allposts = [...posts, response.data];
          setPosts(allposts);
          setPostTitle('');
          setPostBody('');
          navigate('/');

      } catch(err) {

        console.log(`Error: ${err.message}`);            

      }
     
      
  }


  const handleDelete = async (id) => {
    try {
         await api.delete(`/posts/${id}`);

        const postlist = posts.filter((post) => post.id !== id);
        setPosts(postlist);

        const deletelist = posts.find((post) => post.id === id);
        const response = await api1.post('./deletedposts',deletelist);

        const alldelposts = [...deletedposts, response.data];
        //console.log(alldelposts);
        setDeletedPosts(alldelposts);
          
        navigate('/');   //going back to the home page
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
};


  const handlePermDelete = async (id) => {
    
    try {

      await api1.delete(`/deletedposts/${id}`);

      const delpostlist = deletedposts.filter((post) => {
        if(post.id !== id)   
          return post;
      })

      setDeletedPosts(delpostlist);
      navigate('/trash');

    } catch(err) {
      console.log(err.message);
    }
  
  }

  const handleRestore = async (id) =>{
      try {

        const newpost = deletedposts.find((post) => {
          if(post.id === id)
            return post;
        })

        const response = await api.post('/posts', newpost);
        const allposts = [...posts,response.data];
        setPosts(allposts);


        handlePermDelete(id); //to delete from deletedposts
        

      } catch(err) {

      }
  }

  //index is by default
return (
    <Routes>
      <Route path="/" element={
          <Layout
              width={width}
              search={search}
              setSearch={setSearch}
          />  }  >

        <Route index element={
            <Home 
                posts={
                    posts.filter((post) => {
                      if(post.title.toLowerCase().includes(search) || post.body.includes(search))
                          return post;
                    })
                } 
              //  fetchError={fetchError}
                //isLoading={isLoading}
            />} />   

        <Route path="post">   

            <Route index element={
              <NewPost
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />} />

            <Route path=":id" element={
                <PostPage
                  posts={posts}
                  handleDelete={handleDelete}
                  deletedposts = {deletedposts}
                />} />

        </Route>

        <Route path="trash">   

            <Route index element={
              <Trash
                  deletedposts={deletedposts}
                />} />

            <Route path=":id" element={
              <DelPostPage
                handlePermDelete={handlePermDelete}
                deletedposts = {deletedposts}
                handleRestore={handleRestore}
              />} />

        </Route>

        <Route path="*" element={<Missing />} />
        <Route path="edit/:id" element= {
              <EditPost 
                  posts={posts}
                  handleEdit={handleEdit}
                  editBody={editBody}
                  setEditBody={setEditBody}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle} 
          /> } />

      </Route>
    </Routes>

  );
}

export default App;

