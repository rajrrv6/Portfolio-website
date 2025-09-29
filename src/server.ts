import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request, Response, NextFunction } from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as nodemailer from 'nodemailer';


// Load environment variables from the correct location
const serverDistFolder = dirname(fileURLToPath(import.meta.url));


const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Body parser middleware to handle form data
 */
app.use(express.json());

/**
 * API endpoint to handle contact form submissions.
 */
app.post('/api/send-email', (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter using your email service details
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' or your service provider
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS'],
    },
    // SSL certificate verification ko ignore karne ke liye yeh line add karen
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env['EMAIL_USER']}>`,
    to: process.env['EMAIL_USER'], // The email address you want to receive the messages
    subject: `New Message from Portfolio: ${name}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ error: 'Failed to send message.' });
    }
    console.log('Message sent:', info.response);
    return res.status(200).send({ message: 'Message sent successfully!' });
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req: Request, res: Response, next: NextFunction) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);