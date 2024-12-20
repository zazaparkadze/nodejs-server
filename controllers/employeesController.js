const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({ empl: employees, Anna: employees[3].age() });
};

const createEmployee = async (req, res) => {
  if (
    !req.body ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.birthDate ||
    !req.body.phone ||
    !req.body.email
  )
    return res.status(500).json("all info are required");
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const birthDate = req.body.birthDate;
  const phone = req.body.phone;
  try {
    const newEmployee = await Employee.create({
      firstname: firstname,
      lastname: lastname,
      birthDate: birthDate,
      phone: phone,
      email: req.body.email,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error.errors);
    res.status(400).json("User required info not submitted");
  }
};

const updateEmployee = async (req, res) => {
  if (!req.body._id)
    return res.status(400).json({ message: "_id is required!!" });

 const   updatedEmployee = await Employee.findByIdAndUpdate(
    req.body._id,
    req.body.firstname && req.body.lastname && req.body.phone && req.body.email
      ? {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
      }
      : req.body.phone && req.body.email
      ? {
          phone: req.body.phone,
          email: req.body.email,
        }
      : req.body.phone && !req.body.email
      ? { phone: req.body.phone }
      : !req.body.phone && req.body.email
      ? { email: req.body.email }
      : null,
    { new: true, upsert: true }
  ); 

  res.json(updatedEmployee);
};

const deleteEmployee = async (req, res) => {
  if (!req.body._id)
    return res.status(400).json({ message: "_id is required!!" });
  const result = await Employee.findOneAndDelete({ _id: req.body._id });
  result
    ? res.json({ message: `employee with id ${req.body._id} is deleted` })
    : res.json({ message: " no employee found" });
};

const getEmployee = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "params required" });
  const foundEmployee = await Employee.findOne({ _id: req.params.id });
  if (!foundEmployee)
    return res.status(400).json(`no employee with id ${req.params.id}`);
  res.status(200).json({ employee: foundEmployee, age: foundEmployee.age() });
};
module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
