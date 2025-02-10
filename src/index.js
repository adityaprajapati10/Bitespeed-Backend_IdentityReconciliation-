import express from 'express';
import contactRoutes from './routes/contact.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json()); 
app.use(cors());

app.use('/', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});