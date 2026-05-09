import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    domain: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
      default: 'Uncategorized',
    },
    visitedAt: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // In seconds
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
