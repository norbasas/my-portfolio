import nodemailer from 'nodemailer';

interface SendEmailParams {
    userEmail: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  const { userEmail, subject, message }: SendEmailParams = await req.json();

  const transporter = nodemailer.createTransport({
    // host: 'sandbox.smtp.mailtrap.io', // Replace with your SMTP server host
    // port: 2525, // Replace with the appropriate port
    // secure: false, 
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // Your SMTP user
      pass: process.env.SMTP_PASS, // Your SMTP password
    },
  });

  const mailOptions = {
    from: `"My Portfolio" <${userEmail}>`, // Sender address
    to: 'norbzqwerty@gmail.com', // Your email address
    subject: subject ? subject : "Email from Portfolio ✨", // Subject line
    text: `Email Received! 🎉\n\nSender: ${userEmail}\nMessage:\n${message}`, // Include the user's email in the message body
    replyTo: userEmail, // Set the reply-to address as the user's email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true, info }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as any).message }), { status: 500 });
  }
}
