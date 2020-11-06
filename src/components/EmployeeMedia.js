import React from 'react'
//Displays a media object with employee picture, name, email, phone, birthday, and address
export default function EmployeeMedia({employee}) {
    return (
        <ul className="list-unstyled">
            <div className="row">
                <li className="media">
                    <img src={employee.picture.large} className="mr-3 media-image" alt="Portrait" loading="lazy"/>
                    <div className="media-body">
                        <h4 className="mt-0 mb-1"><strong>{employee.name.title} {employee.name.first} {employee.name.last}</strong></h4>
                        <div className="container">
                            <div className="row">
                        <div className ="col-lg">
                            <h5>Personal Information</h5>
                            <ul>
                                <li><strong>Email: </strong> {employee.email}</li>
                                <li><strong>Phone: </strong>{employee.phone}</li>
                                <li><strong>Birthday: </strong>{employee.dob.date.slice(0,10)}</li>
                                
    
                            </ul>
                        </div>
                        <div className ="col-lg">
                            <h5>Address</h5>
                            <ul className="list-unstyled">
                                <li>{employee.location.street.number} {employee.location.street.name}</li>
                                <li>{employee.location.city}, {employee.location.state}</li>
                                <li>{employee.location.postcode}</li>
                            </ul>
                            
                        </div>
                            </div>
                        </div>
                            
                     </div>
                </li>

            </div>

        </ul>
    )
}
