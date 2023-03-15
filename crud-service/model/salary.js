import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const salerySchema = mongoose.Schema({
    employeeId: { type: String, unique: true },
    salary: Number,
});

salerySchema.plugin(autoIncrement.plugin, 'salaries');

const Salery = mongoose.model('salaries', salerySchema);

export default Salery;
