import { setupDatabase } from './config/mongo';
import { server } from './config/server';

setupDatabase();

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
