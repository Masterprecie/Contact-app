/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';

const Employee = () => {


	const [employeeData, setEmployeeData] = useState(null)
	const [filter, setFilter] = useState('')

	const navigate = useNavigate();

	const setDetail = (id) => {
		navigate('/details/' + id)
	}
	const setEdit = (id) => {
		navigate('/edit/' + id)
	}
	const setDelete = (dataId) => {
		if (window.confirm('Do you want to delete this contact permanently?')) {
			fetch(' http://localhost:8000/employee/' + dataId, {
				method: 'DELETE',
			}).then((res) => {
				alert('Deleted Successfully')
				window.location.reload();
			}).catch((err) => {
				console.log(err.message);
			})
		}
	}

	useEffect(() => {
		fetch(' http://localhost:8000/employee')
			.then((res) => {
				return res.json();
			}).then((resp) => {
				setEmployeeData(resp);
			}).catch((err) => {
				console.log(err.message);
			})
	}, [])

	return (
		<div className='container'>
			<div className='card' >
				<div className='card-title text-center'>
					<h2>Contact List</h2>
				</div>
				<div className='card-body'>
					<div className=' d-flex justify-content-between'>
						<div className='divbtn'>
							<Link to='/create' className='btn btn-success'>Add new contact (+)</Link>
						</div>
						<div className='divbtn'>
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
								onChange={(e) => setFilter(e.target.value)}
							/>
						</div>
					</div>
					<table className='table table-bordered'>
						<thead className='bg-dark text-white'>
							<tr>
								<td>ID</td>
								<td>Name</td>
								<td>Email</td>
								<td>Phone</td>
								<td>Action</td>
							</tr>
						</thead>
						<tbody>
							{employeeData &&
								employeeData
									.filter((item) => {
										return filter.toLowerCase() === ''
											? item
											: item.name.toLowerCase().includes(filter);
									})
									.map(item => {
										return (
											<>
												<tr key={item.id}>
													<td>{item.id}</td>
													<td>{item.name}</td>
													<td>{item.email}</td>
													<td>{item.phone}</td>
													<td>
														<a onClick={() => { setEdit(item.id) }} className='btn btn-success'> Edit </a>
														<a onClick={() => { setDelete(item.id) }} className='btn btn-danger'> Delete </a>
														<a onClick={() => { setDetail(item.id) }} className='btn btn-primary'> Details </a>
													</td>
												</tr>
											</>
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

export default Employee