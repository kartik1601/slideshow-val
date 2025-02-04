import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
    data: {
        type: Array,
        required: [true, 'Please provide the details.']
    },
    date: {
        type: Date,
        required: [true, 'Please provide the Date.'],
        unique: [true, 'Date should be unique.'],
    },
    createdById: {
        type: String,
        required: [true, 'Please provide user Id'],
    }, 
    updatedById: {
        type: String,
    }
});

const Memory = mongoose.models.memories || mongoose.model('memories', memorySchema);

export default Memory;