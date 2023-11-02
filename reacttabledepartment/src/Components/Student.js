import React, { Component } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Students: [],
      formData: {
        name: '',
        age: '',
        departmentId: '', // The selected department foreign key
      },
      departments: [],
    };
  }
  componentDidMount() {
    this.getStudents();
    this.getDepartments(); // Load department options
  }

  getStudents = () => {
    axios
      .get("https://localhost:7038/api/Students")
      .then((response) => {
        this.setState({ Students: response.data });
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  getDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:7038/api/Department");
      this.setState({ departments: response.data });
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  }

  createStudent = async () => {
    const { formData } = this.state;

    try {
      const response = await axios.post("https://localhost:7038/api/Students", formData);
      console.log('Student created:', response.data);
      this.getStudents(); // Refresh the student list
    } catch (error) {
      console.error('Error creating student:', error);
    }
  }
  renderDepartmentOptions() {
    return this.state.departments.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ));
  }
  render() {
    const columns = [
      {
        name: "Name",
        selector: (e) => e.name,
        sortable: true,
      },
      {
        name: "Age",
        selector: (e) => e.age,
        sortable: true,
      },
      {
        name: "Department",
        selector: (e) => e.department.name,
        sortable: true,
      },
      {
        name: "Actions",
        selector: (e) => (
          <>
            <button type="button" className="btn btn-primary" onClick={() => this.editData(e.id)}>
              <i className="fas fa-edit"></i>
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={() => this.deleteData(e.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </>
        ),
      },
    ];

    return (
      <div>
        <h2>Students</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.formData.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={this.state.formData.age}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Department:</label>
            <select
              name="departmentId"
              value={this.state.formData.departmentId}
              onChange={this.handleInputChange}
            >
              <option value="">Select Department</option>
              {this.renderDepartmentOptions()}
            </select>
          </div>
          <div>
            <button type="button" onClick={this.createStudent}>Add Student</button>
          </div>
        </form>

        <DataTable
          columns={columns}
          data={this.state.Students}
          pagination
          selectableRows
          onSelectedRowsChange={({ selectedRows }) => {
            const selectall = selectedRows.map((row) => row.id);
            this.setState({ selectall });
          }}
          highlightOnHover
          fixedHeader
          defaultSortFieldId={1}
          actions
          contextActions={<div>
          </div>}
        />
      </div>
    );
  }
}

export default Student;
