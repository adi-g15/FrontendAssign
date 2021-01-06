// same for both operation and filter
// For reference to user

interface filter {
    name: String,   // name to show on screen
    opr: String,
    val: Boolean | String | Number,
    key_name: String    // the name as stored for profiles
}

interface operation {
    name: String,
    opr: [String],  // filter will have one of these cons
    type: String,    // specifies what val can the filter take
    key_name: String    // the name as stored for profiles
}
