import mongoose, { Types } from 'mongoose';

const billingSchema = new mongoose.Schema(
  {
    //This billing Schema is the header for the bill, the details will be store in detail billing schema
    //Logged user ['Admin', 'Helper']
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'El recibo debe contener el ID del vendedor o comprador'],
    },
    createdAt: {
      type: String,
    },
    customer: {
      type: String,
    },
    totalDishes: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    isFiado: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'Completed',
    },
    paymentIntent: {
      type: String,
    },
    isPaid: { type: Boolean, default: false },
    body: {
      type: Object,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
billingSchema.virtual('dishes', {
  ref: 'detailedBill',
  foreignField: 'bill',
  localField: '_id',
});

billingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name tn',
  });

  next();
});

export default mongoose.models.Bill || mongoose.model('Bill', billingSchema);
