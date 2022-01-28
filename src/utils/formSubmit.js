import addToMailchimp from "gatsby-plugin-mailchimp";

const formSubmit = (target, data) => {
  const fields = {};
  if (data) {
    switch (target) {
      case "mailchimp":
        if (data.email) {
          if (data?.full_name) {
            fields.FNAME = data.full_name.value.split(" ")[0];
            fields.LNAME = data.full_name.value.split(" ")[1];
          }
          if (data?.address) {
            fields.ADDRESS = data.address;
          }
          if (data?.phone) {
            fields.PHONE = data.phone;
          }
          if (data?.birthday) {
            fields.BIRTHDAY = data.birthday;
          }
          return sendToMailchimp(data.email.value, fields);
        } else {
          console.error("Mailchimp require the email filed");
        }
      default:
        console.error("No service detected, check your target!");
        break;
    }
  } else {
    console.error("No data detected");
  }
};

const sendToMailchimp = async (email, fields) => {
  debugger;
  const submission = await addToMailchimp(email, fields);
  return { result: submission.result, messagge: submission.msg };
};

export default formSubmit;
