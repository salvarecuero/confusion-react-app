import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const DishDetail = (props) => {
    const dish = props.dish;
    const comments = props.comments;
    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
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
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} />
                    </div>
                </div>
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
        </div>
    )
};

export default DishDetail;