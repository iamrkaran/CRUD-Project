import React from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import './style.css'

class Inputstudent extends React.Component {
    state = {
        firstname: '',
        lastname: '',
        place: ''
    }
    handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        if (this.state.firstname != '' && this.state.lastname != '', this.state.place != '') {
            axios.post('https://abc-fgh.herokuapp.com/students', this.state)
                .then(res => {
                    console.log('successfully posted');
                    this.setState({ firstname: '', lastname: '', place: '' });
                });
            window.location = '/';

        }
    }
    render() {
        return (
            <div className="row text-center">

                <div className="col-md-6">
                    <form onSubmit={() => this.handleSubmit()}>
                        <input required onChange={(e) => this.handleChange(e)}
                            name='firstname'
                            value={this.state.firstname}
                            placeholder="First Name"
                            id='reg-input'
                            className='form-control'
                        />
                        <input required onChange={(e) => this.handleChange(e)}
                            name='lastname' 
                            value={this.state.lastname}
                            id='reg-input'
                            placeholder="Last Name"
                            className="form-control" 
                            />
                        <input required onChange={(e) => this.handleChange(e)}
                            name='place'
                            value={this.state.place}
                            id='reg-input' placeholder="Place"
                            className="form-control" 
                            />
                        <button id='btn-reg'
                            className="btn btn-lg btn-block">
                            CREATE
                        </button>
                    </form>
                </div>

            </div>
        );
    }
}
export default Inputstudent;
