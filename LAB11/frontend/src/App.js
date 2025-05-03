import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students. Please try again later.");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/students", formData);
      fetchStudents();
    } catch (err) {
      setError("Failed to add student. Please try again.");
      console.error("Error adding student:", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      setError("Failed to delete student. Please try again.");
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Recording System</h1>
      </header>
      
      <main className="app-main">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-section">
          <StudentForm addStudent={addStudent} />
        </div>
        
        <div className="list-section">
          {loading ? (
            <div className="loading">Loading students...</div>
          ) : (
            <StudentList students={students} deleteStudent={deleteStudent} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;