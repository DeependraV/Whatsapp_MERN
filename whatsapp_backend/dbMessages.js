import mongoose from 'mongoose'
const whatsappScheme=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    receiver:Boolean
})
export default mongoose.model('messagecontents',whatsappScheme);
