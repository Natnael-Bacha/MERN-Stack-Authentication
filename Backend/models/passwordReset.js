import mongoose from "mongoose";
const passwordResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '15m' } 
  },
  used: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});





passwordResetTokenSchema.statics.findValidToken = function(tokenHash) {
  return this.findOne({
    token: tokenHash,
    used: false,
    expiresAt: { $gt: new Date() }
  }).populate('userId');
};


passwordResetTokenSchema.methods.markAsUsed = function() {
  this.used = true;
  return this.save();
};

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);
export default PasswordResetToken;