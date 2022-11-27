/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EmployDetails = () => {
  const { dataId } = useParams();

  const [employeeData, setEmployeeData] = useState({})

  useEffect(() => {
    fetch('http://localhost:8000/employee/' + dataId)
      .then((res) => {
        return res.json();
      }).then((resp) => {
        setEmployeeData(resp);
      }).catch((err) => {
        console.log(err.message);
      })
  }, [])
  console.log(employeeData);

  return (
    <div>
      <div className='card-body container text-center pt-5'>
        {employeeData &&
          <div>
            <h3>Contact Details</h3>
            <h5>Email: {employeeData.email}</h5>
            <h5>Phone number: {employeeData.phone}</h5>
            <Link className='btn btn-danger' to='/'>Back to Saved Contacts</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default EmployDetails