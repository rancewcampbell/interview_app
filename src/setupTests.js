import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import { WebSocket, Server } from 'mock-socket';

const mockServer = new Server(process.env.REACT_APP_WEBSOCKET_URL);

global.WebSocket = WebSocket;
