import { setupDatabase } from './config/mongo';
import { server } from './config/server';

setupDatabase();

server.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000');
});
