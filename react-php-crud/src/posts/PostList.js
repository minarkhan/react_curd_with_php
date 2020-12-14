import React, {Component} from 'react';
import Axios from 'axios';
import {AppContext} from '../components/Context';
class PostsList extends Component{
    static contextType = AppContext;   
    
    state = {
        posts:[]
    }
    
    fetchPosts = () => {
        fetch('http://localhost/php-react/all-posts.php')
        .then(response => {
            response.json().then(function(data) {
                if(data.success === 1){
                    this.setState({
                        posts:data.posts.reverse()
                    });
                } 
                else{
                    this.context.post_show(false);
                }               
            }.bind(this));
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchPosts();
    }

    handleUpdate = (id) => {
        Axios.post('http://localhost/php-react/update-post.php',
        {
            id:id,
            post_title:this.name.value,
            post_content:this.email.value
        })
        .then(({data}) => {
            if(data.success === 1){
                let posts = this.state.posts.map(post => {
                    if(post.id === id){
                        post.post_title = this.name.value;
                        post.post_content = this.email.value;
                        post.isEditing = false;
                        return post;
                    }
                    return post; 
                });
                this.setState({
                    posts
                });
            }
            else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    
    editMode = (id) => {
        let posts = this.state.posts.map(post => {
            if(post.id === id){
                post.isEditing = true;
                return post;
            }
            post.isEditing = false;
            return post;
            
        });

        this.setState({
            posts
        });
       
    }

    cancleEdit = (id) => {
        let posts = this.state.posts.map(post => {
            if(post.id === id){
                post.isEditing = false;
                return post;
            }
            return post
            
        });
        this.setState({
            posts
        });
    }

    handleDelete = (id) => {
        let deletepost = this.state.posts.filter(post => {
            return post.id !== id;
        });
        
        Axios.post('http://localhost/php-react/delete-post.php',{
            id:id
        })
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    posts:deletepost
                });
            }
            else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate(){
        let newpost = this.context.new_post;
        if(newpost){ 
            this.setState({
                posts:[
                    newpost,
                    ...this.state.posts
                    
                ]
            });          
            this.context.new_post = false;
        }        
    }

    render(){

        let allposts = this.state.posts.map(({id,post_title,post_content,isEditing}, index) => {
            
            return isEditing === true ? (   
            <tr key={id}>
                <td><input className="form-control" type="text" ref={(item) => this.name = item} defaultValue={post_title}/></td>
                <td><input className="form-control" type="email" ref={(item) => this.email = item} defaultValue={post_content}/></td>
                <td>
                    <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}>Save</button>
                    <button onClick={() => this.cancleEdit(id)} className="btn btn-light">Cancel</button>
                </td>
            </tr>
            ):
            ( 
                <tr key={id}>
                    <td>{post_title}</td>
                    <td>{post_content}</td>
                    <td>
                        <button className="btn btn-dark mr-2" onClick={() => this.editMode(id)}>Edit</button>
                        <button onClick={() => this.handleDelete(id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });

        

        return(
            <>
            {allposts}
            </>
        );
        
    }
}

export default PostsList;
