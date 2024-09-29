var express = require('express');
var router = express.Router();
const fireBaseDB = require('../config')
const fireStore = require('firebase/firestore');
// const db = require('../config');
const stud = fireStore.collection(fireBaseDB, "student");

// Get all students
router.get('/', async function(req, res, next) {
    try {
        const data = await fireStore.getDocs(stud);
        const studentlist = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.json({ results: studentlist });
    } 
    catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
});

// Get a student by ID
router.get('/:id', async function(req, res, next) {
    const studentId = req.params.id;
    try {
        const studentDoc = await fireStore.getDoc(fireStore.doc(fireBaseDB, "student", studentId));
        
        if (!studentDoc.exists()) {
            res.status(404).send({ message: "Student not found" });
        }
        else {
            const studentData = studentDoc.data();
            const formattedStudent = {
                std_id: studentData.std_id,
                name: `${studentData.first_name} ${studentData.middle_name} ${studentData.last_name}`,
                course: `${studentData.department} - ${studentData.course}`,
                year: studentData.year_level
            };

            res.send(formattedStudent);
        }
    } 
    catch (error) {
        res.status(500).send({ error: "Error fetching student" });
    }
});

// Add a new student
router.post('/', async function(req, res, next) {
    try {
        const data = req.body;
        const docRef = await fireStore.addDoc(stud, data);
        res.status(201).json({ message: "New Student Added", id: docRef.id });
    } 
    catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ error: "Error adding student", details: error.message });
    }
});

// Update a student by ID
router.put('/:id', async function(req, res, next) {
    const studentId = req.params.id;
    const updatedData = req.body;

    try {
        const studentDocRef = fireStore.doc(fireBaseDB, "student", studentId);
        await fireStore.updateDoc(studentDocRef, updatedData);
        res.send({ message: "Student updated successfully" });
    } 
    catch (error) {
        res.status(500).send({ error: "Error updating student" });
    }
});

// Delete a student by ID
router.delete('/:id', async function(req, res, next) {
    const studentId = req.params.id;

    try {
        const studentDocRef = fireStore.doc(fireBaseDB, "student", studentId);
        await fireStore.deleteDoc(studentDocRef);
        res.send({ message: "Student deleted successfully" });
    } 
    catch (error) {
        res.status(500).send({ error: "Error deleting student" });
    }
});

module.exports = router;