import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="row text-center">
                <div className="col-md-4">
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

            </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;