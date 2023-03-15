import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);
const employeSchema = mongoose.Schema({
  employeeId: { type: String, unique: true },
  employeeName: String,
  Department_Team: String,
  sex: String,
  maritalStatus: String,
  salary: { type: mongoose.Schema.Types.Number, ref: 'salaries' },
  address: String,
});

employeSchema.plugin(autoIncrement.plugin, 'employee');


const employee = mongoose.model('employee', employeSchema);


export default employee;