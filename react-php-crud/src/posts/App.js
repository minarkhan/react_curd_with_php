import React,{Component} from 'react';
import PostsList from './PostsList';
import AddPost from './AddPost';
import {Provider} from './Context';
class App extends Component {
    state = {
        post_found:true,
        new_post:false
    }
    addNewPost = (id,title,content) => {
        if(this.state.post_found){
            this.setState({
                new_post:{id:id,post_title:title,post_content:content}
            });
        }
        else{
            this.setState({
                post_found:true
            });
        }
        
    }

    postShow = (show) => {
        this.setState({
            post_found:show
        })
    }
    
    render(){
        const contextValue = {
            new_post:this.state.new_post,
            addNewPost:this.addNewPost,
            post_show:this.postShow
        }

        let showPosts;
        if(this.state.post_found){
            showPosts = (
                <table classtitle="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PostsList/>
                    </tbody>
                </table>
            );
        }
        else{
            showPosts = (
                <div classtitle="alert alert-light" role="alert">
                    <h4 classtitle="alert-heading">No User Found!</h4>
                    <hr/>
                    <p>Please Insert Some Users.</p>
                </div>
            );
        }
        return (
            <Provider value={contextValue}>
            <div classtitle="container-fluid bg-light">
            <div classtitle="container p-5">
                <div classtitle="card shadow-sm">
                    <h1 classtitle="card-header text-center text-uppercase text-muted">React PHP CRUD Application</h1>
                    <div classtitle="card-body">
                        <div classtitle="row">
                            <div classtitle="col-md-4">
                                <AddPost/>
                            </div>
                            <div classtitle="col-md-8">
                                {showPosts}
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            </div>
        </Provider>
        );
    }
}
export default App;