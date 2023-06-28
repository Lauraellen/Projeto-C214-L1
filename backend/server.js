require('../backend/src/infrastructure/database');
const app = require('../backend/src/infrastructure/rest_server');

app.listen(4000, () => {
    console.log('REST server running on port 4000...');
});