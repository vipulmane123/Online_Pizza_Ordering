import React from 'react'
import AdminNavbar from '../Users/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BackendBaseURL } from '../BackendUrl';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewDisplayComponent = () => {


    var [userName, setUserName] = useState("");
    const [allReview, setAllReview] = useState([
        {
            id: "",
            review: "",
            rating: "",
            users: "",
            pizza: "",
            postedOn: "",
        }
    ]);
    var navigate = useNavigate();


    useEffect(() => {
        axios.get(`${BackendBaseURL}/allreviews`).then((res) => {

            setAllReview(res.data)
        })
        console.log("This is review");
    }, []);

    var Remove = (no) => {
        axios.delete(`${BackendBaseURL}/deletereview/id/${no}`);
        var filterReview = allReview.filter((offer) => {
            return (offer.id !== no);
        });
        setAllReview(filterReview);
    }



    var Logout = () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userName");
        navigate("/login");
    }



    return (

        <div>
            <AdminNavbar />
            <div class="container mt-4">
                <div style={{ float: "right", }}>
                    {/* <a href="/AllReviews" className="btn btn-info">ADD REVIEW</a> */}
                    Welcome {" "} {userName} {" "}
                    <button className='btn btn-primary'
                        onClick={Logout}>
                        Log out
                    </button>
                </div>
                <figure class="text-center"><h1>ALL REVIEW</h1></figure>
                <div className="row">
                    <table className="table table-bordered shadow">
                        <thead>
                            {
                            }
                            <tr >
                                <th>Sr. No.</th>
                                <th>Review</th>
                                <th>Rating</th>
                                <th>User Name</th>
                                <th>Pizza Name</th>
                                <th>postedOn</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                // "id": 7,
                                // "review": "qwertyu",
                                // "rating": 8.0,
                                // "user": {
                                //     "first_name": "Onkar",
                                // },
                                // "pizza": {
                                //     "name": "mrudulla",
                                // },
                                // "postedOn": "2022-08-12"
                                allReview.map((review) => {
                                    return (
                                        <tr key={review.id}>
                                            <td>{review.id}</td>
                                            <td>{review.review}</td>
                                            <td>{review.rating}</td>
                                            <td>{review.users.first_name}</td>
                                            <td>{review.pizza.pizzaName}</td>
                                            <td>{review.postedOn}</td>
                                            <td>
                                                <button className='btn btn-danger'
                                                    onClick=
                                                    {
                                                        () => {
                                                            Remove(review.id)
                                                        }
                                                    }>
                                                    Delete
                                                </button>
                                            </td>
                                            {/* <td>
                            <button type="button" class="btn btn-outline-warning">
                            <Link to={`/EditOfferComponent/${offer.id}`}>Edit</Link>
                                        </button>
                            </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplayComponent