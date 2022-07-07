import mongoose from 'mongoose'
  
var certificateSchema = new mongoose.Schema({
    contestID: String,
    certificate:
    {
        data: Buffer,
        contentType: String
    }
});
  
export default new mongoose.model('Certificate', certificateSchema);