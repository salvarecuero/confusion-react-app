import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const DishDetail = (props) => {
    const dish = props.dish;
    const comments = props.comments;
    if (dish != null) {
        return (
            <div className="container">
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </Row>
                <Row>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} />
                    </div>
                </Row>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
};

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
};

function RenderComments({comments}) {
    if(comments) {
        comments = comments.map((commentData) => {
            return (
                <li className="m-2">
                    {commentData.comment}
                    <div className="m-1 font-weight-bold">-- {commentData.author}, {new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(commentData.date)))}</div>
                </li>
            );
        });
    } else {
        return (
            <div></div>
        )
    };

    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comments}
            </ul>
            <CommentForm />
        </div>
    )
};

const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
class CommentForm extends Component {
    constructor() {
        super();

        this.state = {
            isModalOpen: false
        };
        
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        this.toggleCommentModal();
    }

    render() {
        return(
            <div>
                <Button primary outline onClick={this.toggleCommentModal}><span className="fa fa-pencil" /> Submit comment! </Button>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>
                        Submit your comment!
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={3}>Rating</Label>
                                <Col md={3}>
                                        <Control.select defaultValue="1" model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={3}>Author</Label>
                                <Col md={9}>
                                    <Control.text model=".author" name="author"
                                        className="form-control"
                                        placeholder="Insert your name here!"
                                        validators={{
                                            minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlfor="comment" md={3}>Comment</Label>
                                <Col md={9}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col className="text-center">
                                    <Button className="text-center" color="primary" type="submit">
                                        Comment!
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
};


export default DishDetail;