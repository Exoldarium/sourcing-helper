"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = require("./utils/config");
const userRouter_1 = require("./src/routes/userRouter");
const loginRouter_1 = require("./src/routes/loginRouter");
const logoutRouter_1 = require("./src/routes/logoutRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)(config_1.SESSION));
app.use('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/users', userRouter_1.userRouter);
app.use('/api/login', loginRouter_1.loginrouter);
app.use('/api/logout', logoutRouter_1.logoutRouter);
app.listen(config_1.PORT, () => {
    console.log(`Server running on port http://localhost:${config_1.PORT}`);
});
