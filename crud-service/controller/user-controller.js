import Employee from '../model/employee.js';
import Salary from '../model/salary.js';

export const getUsers = async (request, response) => {
    try {
        const users = await Employee.aggregate([
            {
                $lookup:
                {
                    from: "salaries",
                    localField: "employeeId",
                    foreignField: "employeeId",
                    as: "salary"
                }
            }
        ])
        response.status(200).json(users);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const addUser = async (request, response) => {
    const employeeDetails = request.body
    const { employeeId, employeeName, Department_Team, sex, maritalStatus, address } = employeeDetails;
    const { salary } = employeeDetails
    const newSalery = new Salary({ employeeId, salary });
    const newUser = new Employee({ employeeId, employeeName, Department_Team, sex, maritalStatus, address });
    try {
        await newSalery.save();
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error) {
        console.log(error.message, 'Error--------');
        if (error.message.toString().includes('E11000')) {
            return response.status(401).json({ message: 'Employee Id must be Unique' });
        }
        response.status(409).json({ message: error.message });
    }
}

export const getUserById = async (request, response) => {
    console.log(request.params.id);
    try {
        const user = await Employee.findOne({ employeeId: request.params.id }, '-_id -__v');
        const salary = await Salary.findOne({ employeeId: request.params.id }, '-_id -__v -employeeId')
        if (!user || !salary) {
            return response.status(404).json({ message: 'employeeId not found' })
        }
        response.status(200).json({ user, salary });
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const editUser = async (request, response) => {
    const employeeDetails = request.body

    const { salary } = employeeDetails
    const editSalary = new Salary({ salary });

    const { employeeId, employeeName, Department_Team, sex, maritalStatus, address } = employeeDetails;
    const editUser = new Employee({ employeeId, employeeName, Department_Team, sex, maritalStatus, address });

    try {
        await Employee.updateOne({ employeeId: request.params.id }, editUser);
        await Salary.updateOne({ employeeId: request.params.id }, editSalary);
        response.status(201).json({ editUser, editSalary });
    } catch (error) {
        console.log(error.message)
        response.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (request, response) => {
    try {
        await Employee.deleteOne({ employeeId: request.params.id });
        await Salary.deleteOne({ employeeId: request.params.id });
        response.status(201).json("Employee deleted Successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}