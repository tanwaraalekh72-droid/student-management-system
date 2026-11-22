
// Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const searchInput = document.getElementById("searchInput");

// Load saved students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Save students
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Display students in table
function displayStudents(data = students) {

    studentTable.innerHTML = "";

    data.forEach(function(student) {

        const row = document.createElement("tr");

        const rollCell = document.createElement("td");
        rollCell.textContent = student.roll;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.roll);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(rollCell);
        row.appendChild(nameCell);
        row.appendChild(courseCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        studentTable.appendChild(row);
    });

    // Update total count
    totalStudents.textContent = students.length;
}

// Register new student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;

    // Check duplicate roll number
    const exists = students.some(function(student) {
        return student.roll === roll;
    });

    if (exists) {
        alert("This Roll Number already exists!");
        return;
    }

    // Create student object
    const newStudent = {
        name: name,
        roll: roll,
        email: email,
        course: course
    };

    // Add student
    students.push(newStudent);

    // Save and display
    saveStudents();
    displayStudents();

    // Clear form
    studentForm.reset();

    alert("Student registered successfully!");
});

// Delete student
function deleteStudent(roll) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students = students.filter(function(student) {
            return student.roll !== roll;
        });

        saveStudents();
        displayStudents();
    }
}

// Search student
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {
        return (
            student.name.toLowerCase().includes(searchText) ||
            student.roll.toLowerCase().includes(searchText)
        );
    });

    displayStudents(filteredStudents);
});

// Initial display
displayStudents();
