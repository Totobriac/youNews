const emails = ['alice@gmail.com', 'bob@gmail.com', 'charlie@gmail.com'];

const send = email =>
  new Promise(resolve =>
    setTimeout(() => resolve(email), 1000)
  );

const sendAllEmails = async () => {
  for (email of emails) {
    const emailInfo = await send(email);
    console.log(`Mail sent to ${emailInfo}`);
  }

  console.log('All emails were sent');
};

sendAllEmails();