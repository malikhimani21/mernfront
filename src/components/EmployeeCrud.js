import axios from "axios";
import { useEffect, useState } from "react";
import './EmployeeCrud.css';

function EmployeeCrud() {

    const [_id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [employees, setUsers] = useState([]);


    useEffect(() => {
       Load();
    }, []);

    
    async function Load() {
        const result = await axios.get("http://localhost:8000/user/getAll");
        setUsers(result.data.data);
        console.log(result.data);
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/user/create", {
                name: name,
                address: address,
                phone: phone,
                username: username
            });
            alert("Employee Registation Successfully");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setUsername("")
            Load();
        } catch (err) {
            alert("User Registation Failed");
        }
    }

    async function editEmployee(employees) {
        setName(employees.name);
        setAddress(employees.address);
        setMobile(employees.phone);
        setUsername(employees.username);
        setId(employees._id);
    }

    async function DeleteEmployee(_id) {
        await axios.delete("http://localhost:8000/user/delete/" + _id);
        alert("Employee deleted Successfully");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(
                "http://localhost:8000/user/update/" +
                employees.find((u) => u._id === _id)._id || _id,
                {
                    _id: _id,
                    name: name,
                    address: address,
                    phone: phone,
                    username: username,
                }
            );
            alert("Data Updated");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setUsername("")
            Load();
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <div class="container mt-4">
                <form>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            id="_id"
                            hidden
                            value={_id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            class="form-control"
                            id="address"
                            value={address}
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Mobile</label>
                        <input
                            type="text"
                            class="form-control"
                            id="phone"
                            value={phone}
                            onChange={(event) => {
                                setMobile(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button class="btn btn-primary mt-4" onClick={save}>
                            Register
                        </button>
                        <button class="btn btn-warning mt-4" onClick={update}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
            
            <hr /><br /><br />

            <table className="table1" class="table" align="center">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Username</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {employees.map(function fn(employee) {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{employee._id} </th>
                                <td>{employee.name}</td>
                                <td>{employee.address}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.username}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        onClick={() => editEmployee(employee)}
                                    >
                                        Edit
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        onClick={() => DeleteEmployee(employee._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}
export default EmployeeCrud;