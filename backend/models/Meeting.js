const meetingSchema = new mongoose.Schema({
  meeting_id: {
    type: String,
    required: true,
    unique: true,
  },
  messages: {
    type: Object, // 直接使用Object类型
    default: {},
  },
  meeting_participants: {
    type: [String],
    default: [],
  },
});
