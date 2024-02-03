import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts'
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';


const DataContext = createContext({});

export const DataProvider  = ({children}) => {

    const [posts, setPosts] = useState([])

    const [search, setSearch] = useState('');
    
    const [postTitle, setPostTitle] = useState('');
    
    const [postBody, setPostBody] = useState('');
  
    const [editTitle, setEditTitle] = useState('');
    
    const [editBody, setEditBody] = useState('');
    
    const navigate = useNavigate();
  
    const {width} = useWindowSize();  //destructing to pull width
  
    const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');  
  
    useEffect ( () => {
      setPosts(data);
    },[data]);
    
    const handleEdit = async (id) => {

        const datetime=format(new Date(), 'MMMM dd, yyyy pp');
        const newpost={id:id, title:editTitle, datetime: datetime, body:editBody};
    
          try {
    
            const response= await api.put(`/posts/${id}`,newpost);
            const allposts=posts.filter((post) => {
              if(post.id === id)
                  return response.data;
              else 
                  return post; 
            })
            setPosts(allposts);
            setEditBody('');
            setEditTitle('');
            navigate('/');
    
          } catch(err) {
    
            console.log(`Error: ${err.message}`);                    
    
          } 
    
    
      }
    
      const handleSubmit = async () => {
    
          const id= posts.length ? parseInt(posts[posts.length-1].id) +1 : 1;
          const datetime=format(new Date(), 'MMMM dd, yyyy pp');
          const newpost={id:id, title:postTitle, datetime: datetime, body:postBody};
          
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
              const postlist=posts.filter((post) => {
                  if(post.id !== id)
                      return post;
              })
              setPosts(postlist);
              navigate('/');   //going back to home page
        } catch(err) {
    
          console.log(`Error: ${err.message}`);  
        
        }
    }
    


    return (
        
        <DataContext.Provider value={{
                width ,search,setSearch,fetchError,isLoading

        }} >
                {children}
        </DataContext.Provider>

    )

}

export default DataContext;