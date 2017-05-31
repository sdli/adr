import './theme/index.less';
import dva from 'dva';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva(createLoading());

// 2. Model
app.model(require('./models/login'));
// app.model(require('./models/check'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');