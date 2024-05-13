import { useEffect, useState } from 'react';
import ioClient from 'socket.io-client';

const SERVER_URL = 'https://server-o8if.onrender.com';

export const useSocket = () => {
    const [data, setData] = useState({ allDevices: [], message: [], lastUpdated: null });

    useEffect(() => {
        const socket = ioClient(SERVER_URL, { reconnection: true });

        socket.on('connect', () => {
            // Optionally log connection status
            console.log('Connected to WebSocket server');
        });

        socket.on('all-devices', (devices) => {
            console.log('Received all devices:', devices);
            setData({ allDevices: devices, message: data.message, lastUpdated: 'allDevices' });
        });

        socket.on('device-state-changed', (devices) => {
            console.log('Device state changed:', devices);
            setData({ allDevices: devices, message: data.message, lastUpdated: 'allDevices' });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        socket.on('sensor-channel', (message) => {
            console.log(message);
            setData({ allDevices: data.allDevices, message: message, lastUpdated: 'message' });
        });

        // Cleanup function to disconnect and remove listeners
        return () => {
            socket.off('connect');
            socket.off('all-devices');
            socket.off('device-state-changed');
            socket.off('disconnect');
            socket.off('sensor-channel');
            socket.disconnect();
        };
    }, []); // Dependency on data to update the log statements and maintain state updates

    // Return the whole data object or structure it based on your needs
    return data;
};
