import React,{Component} from 'react';
import Axios from 'axios';
import {AppContext} from '../components/Context';

export default class AddPost extends Component{
    static contextType = AppContext;   
    
    insertPost = (event) => {
        event.preventDefault();
        event.persist();
        Axios.post('http://localhost/php-react/add-user.php',{
            user_name:this.title.value,
            user_email:this.content.value
        })
        .then(function ({data}) {
            if(data.success === 1){
                
                this.context.addNewUser(data.id,this.title.value,this.content.value);
                event.target.reset();
                // alert(data.msg);
            }
            else{
                alert(data.msg);
            }
        }.bind(this))
        .catch(function (error) {
        console.log(error);
        });

    }

    render(){

        return(
            <form onSubmit={this.insertPost}>
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <label className="font-weight-bold">Title</label>
                    <input type="text" name="title" ref={(val) => this.title = val} className="form-control" placeholder="title"/>
                </div>
                <div className="form-group col-sm-6">
                    <label className="font-weight-bold">Content</label>
                    <input type="text" name="content" ref={(val) => this.content = val} className="form-control" placeholder="Email"/>
                </div>
                <div className="form-group col-sm-12 text-right">
                    <button type="submit" className="btn btn-primary">Add user</button>
                </div>
            </div>
        </form>        
        );
    }
}