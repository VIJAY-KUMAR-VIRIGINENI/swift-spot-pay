const mongoose=require('mongoose');

const parkingSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        price: {
            type: Number,
            required: true
          },
          time: {
            type: Date,
            required: true
          },
          location: {
            type: {
              type: String,
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          },

       
    },
    {
        timestamps:true
    }   

)

module.exports=mongoose.model('Park',parkingSchema);