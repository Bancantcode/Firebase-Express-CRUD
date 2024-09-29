var express = require('express');
var router = express.Router();
const fireBaseDB = require('../config');
const fireStore = require('firebase/firestore');

const dept = fireStore.collection(fireBaseDB, "department");

router.get('/', async function(req, res, next) {
    try {
        const data = await fireStore.getDocs(dept);
        const deptlist = data.docs.map((doc) => {
            const departmentData = doc.data();
            return {
                id: doc.id,
                name: departmentData.name,
                courses: departmentData.courses,
                dpt_id: departmentData.dpt_id,
                description: departmentData.description
            };
        });
        res.send({ results: deptlist });
    } 
    catch (error) {
        res.status(500).send({ error: "Error fetching departments" });
    }
});

router.get('/:id', async function(req, res, next) {
    const deptId = req.params.id;
    try {
        const deptDoc = await fireStore.getDoc(fireStore.doc(fireBaseDB, "department", deptId));
        
        if (!deptDoc.exists()) {
            res.status(404).send({ message: "Department not found" });
        } 
        else {
            const departmentData = deptDoc.data();
            const formattedDepartment = {
                dpt_id: departmentData.dpt_id,
                name: departmentData.name,
                courses: departmentData.courses,
                description: departmentData.description,
            };
            res.send(formattedDepartment);
        }
    } 
    catch (error) {
        res.status(500).send({ error: "Error fetching department" });
    }
});

router.post('/', async function(req, res, next) {
    try {
        const data = req.body;
        await fireStore.addDoc(dept, data);
        res.send({ message: "New Department Added" });
    } 
    catch (error) {
        res.status(500).send({ error: "Error adding department" });
    }
});

router.put('/:id', async function(req, res, next) {
    const deptId = req.params.id;
    const updatedData = req.body;

    try {
        const deptDocRef = fireStore.doc(fireBaseDB, "department", deptId);
        await fireStore.updateDoc(deptDocRef, updatedData);
        res.send({ message: "Department updated successfully" });
    } 
    catch (error) {
        res.status(500).send({ error: "Error updating department" });
    }
});

router.delete('/:id', async function(req, res, next) {
    const deptId = req.params.id;

    try {
        const deptDocRef = fireStore.doc(fireBaseDB, "department", deptId);
        await fireStore.deleteDoc(deptDocRef);
        res.send({ message: "Department deleted successfully" });
    } 
    catch (error) {
        res.status(500).send({ error: "Error deleting department" });
    }
});

module.exports = router;
