/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Paginate from "../pagination/paginate.js";
import { NavLink ,Link } from "react-router-dom";
import "./usertable.css";
import Dropdown from "./dropdown";
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

/** started on 8/5/2020 */
/**  we can type "rfc" and then enter and it will create a default react functional component, that's because of ES7 react Extension */

export default function UserTable(props) {
  console.log("books at table ", props.shelveBooks);


  function setRating(value, prevValue, name) {
    axios.put("http://localhost:5000/book/" + name + "/review", {
        user_id: JSON.parse(localStorage.currentUserInfo).user._id,
        rating: value
    }).then((response) => null).catch(console.error)
}


  return (
    <div className="card text-center main">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className="nav-link disabled"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              {props.title}
            </a>
          </li>
        </ul>
      </div>

      <div className="card-body">
        <table className="table  table-bordered" >
          <thead style={{display:"block"}}>
            <tr>
                <>
                
              <th scope="col">Cover</th>
              <th scope="col">Name </th>
              <th scope="col">Author</th>
              <th scope="col">Avg Rating</th>
              <th scope="col">Rating</th>
              <th scope="col">Shelve</th>
              </>
            </tr>
          </thead>


          <tbody  style={{display:"block"}}>
            {props.shelveBooks.map((shelve, index) => (
              <tr >
                {shelve.book.map((book, index) => (
                 
                 <tr>
                 <>
                    <td>
                      <img src="https://image.flaticon.com/icons/svg/166/166088.svg"></img>
                    </td>

                    <td>
                      <NavLink
                       to={"/books/" + book._id}
                       style={{textDecoration:"underline"}} >
                {book.name}</NavLink>
                    </td>

                    <td>
                    <NavLink
                       to={"/authors/" + book.author._id}
                       style={{textDecoration:"underline"}}>
                        {book.author.firstName +"  "+ book.author.lastName || "None"}
                      </NavLink>
                    </td>
                    <td>  <StarRatingComponent 
                                    name={book._id + "avg"} 
                                    starCount={5}
                                    value={book.avgRating}
                                /> </td>
                    <td>
                    <StarRatingComponent 
                                    name={book._id} 
                                    starCount={5}
                                    value={book.reviews.rating}
                                    onStarClick={setRating}
                                    />
                    </td>
                    <td>
                      
                      <Dropdown shelve={shelve.name} bookid={book._id} />
                    </td>
                    </>
                    </tr>
                    
                ))}
              </tr>
              
            ))}
          </tbody>
        </table>

        <div className="rightpane pagination">
          {" "}
          <Paginate />{" "}
        </div>
      </div>
    </div>
  );
}
