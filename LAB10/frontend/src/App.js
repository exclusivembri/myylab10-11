import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css"; // Make sure this file exists (or use inline styles)

const App = () => {
  const [students, setStudents] = useState([]);

  // Fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    setStudents([]); // Fallback to empty array
    alert("Failed to load students. Check console for details.");
    }
  };

  // Add student and update list
  const addStudent = async (name, course) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/students", { name, course });
      fetchStudents(); // Refresh list
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Check console for details.");
    }
  };

  return (
    <div className="App">
      <h1>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} />
    </div>
  );
};

export default App;