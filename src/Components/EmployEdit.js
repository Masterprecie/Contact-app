/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EmployEdit = () => {
	const { dataId } = useParams();

	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [active, setActive] = useState(true)
	const [validation, setValidation] = useState(false)

	//const [employeeData, setEmployeeData] = useState({})
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault()
		const employeeData = { id, name, email, phone, active }
		//console.log({ id, name, email, phone, active });
		fetch(' http://localhost:8000/employee/' + dataId, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(employeeData)
		}).then((res) => {
			alert('Saved Successfully')
			navigate('/')
		}).catch((err) => {
			console.log(err.message);
		})
	}

	useEffect(() => {
		fetch('http://localhost:8000/employee/' + dataId)
			.then((res) => {
				return res.json();
			}).then((resp) => {
				setId(resp.id);
				setName(resp.name)
				setEmail(resp.email)
				setPhone(resp.phone)
				setActive(resp.isactive)
			}).catch((err) => {
				console.log(err.message);
			})
	}, [])

	//console.log(employeeData);
	return (
		<div>

			<div>
				<div className='row'>
					<div className='offset-lg-3 col-lg-6'>
						<form className='container' onSubmit={handleSubmit}>
							<div className='card'>
								<div className='card-title'>
									<h2>Edit Employee</h2>
								</div>
								<div className='card-body'>
									<div className='row'>
										<div className='col-lg-12'>
											<div className='form-group'>
												<label>ID</label>
												<input className='form-control'

													value={id}
													disabled='disabled'
												/>
											</div>
										</div>
										<div className='col-lg-12'>
											<div className='form-group'>
												<label>Name</label>
												<input className='form-control'
													required
													onMouseDown={(e) => setValidation(true)}
													value={name}
													onChange={(e) => setName(e.target.value)}
												/>

												{name.length === 0 && validation && < span className='text-danger'>Enter your name</span>}
											</div>
										</div>
										<div className='col-lg-12'>
											<div className='form-group'>
												<label>Email</label>
												<input className='form-control'
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>

											</div>
										</div>
										<div className='col-lg-12'>
											<div className='form-group'>
												<label>Phone</label>
												<input className='form-control'
													value={phone}
													onChange={(e) => setPhone(e.target.value)}
												/>
											</div>
										</div>
										<div className='col-lg-12'>
											<div className='form-check'>
												<input
													className='form-check-input'
													checked={active}
													type='checkbox'
													onChange={(e) => setActive(e.target.checked)}
												/>
												<label className='form-check-label'>Is Active</label>
											</div>
										</div>
										<div className='col-lg-12'>
											<div className='form-group'>
												<button className='btn btn-success' type='submit'>Save</button>
												<Link to={'/'} className='btn btn-danger'>Back</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div >

			</div >

		</div>
	)
}

export default EmployEdit