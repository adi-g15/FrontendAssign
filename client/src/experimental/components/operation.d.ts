// same for both operation and filter
// For reference to user

interface filter {
    name: String,
    opr: String,
    val: Boolean | String | Number
}

interface operation {
    name: String,
    opr: [String],  // filter will have one of these cons
    type: String    // specifies what val can the filter take
}
