const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { formatDistanceToNow } = require("date-fns");

const employeeSchema = new Schema({
  firstname: String,
  lastname: String,
  birthDate: {
    type: String,
    validate: {
      validator: function () {
        return /^\d{2}([/\-.])\d{2}\1\d{4}$/.test(this.birthDate);
      },
      message: (props) =>
        `${props.path}: ${props.value} is not a valid Birth Date!}`,
    },
    required: [true, "Employee Birth Date required"],
  },
  phone: {
    type: String,
    validate: {
      validator: function () {
        return /^0\d{2}([/\-.])\d{3}\1\d{4}$/.test(this.phone);
      },
      reason: 'not valid hahaha!',
    }
  },
  email: {
    type: String,
    validate: {
      validator: function () {
        return  /(^\w+@\w+\.)(com)?(org)?(co\.il)?(gov\.il)?(biz)?$/.test(this.email)
      },
      message: (props) =>
        `${props.path}: ${props.value} is not a valid email address!}`,
    },
    required: [true, "Employee email required"]
  }
});

employeeSchema.methods.age = function age() {
  const birthDateArray = this.birthDate.split(
    this.birthDate.charAt(2) === "/" ? "/" : this.birthDate.charAt(2) === "." ? "." : "-"
  );
  return formatDistanceToNow(
    new Date(birthDateArray[2], birthDateArray[1], birthDateArray[0])
  );
};

module.exports = mongoose.model("Employee", employeeSchema);
