import { useEffect, useState } from 'react';
import ioClient from 'socket.io-client';

const SERVER_URL = 'https://server-o8if.onrender.com';

export const useSocket = () => {
    const [allDevices, setAllDevices] = useState([]);

    useEffect(() => {
        const socket = ioClient(SERVER_URL, { reconnection: true });

        socket.on('connect', () => {
            /* console.log('Connected to WebSocket server'); */
        });

        socket.on('all-devices', (devices) => {
           /*  console.log('Received all devices:', devices); */
            setAllDevices(devices);
        });

        socket.on('device-state-changed', (data) => {
            /* console.log('Device state changed:', data); */
            setAllDevices(data)
        });

        socket.on('disconnect', () => {
            /* console.log('Disconnected from WebSocket server'); */
        });

        // Cleanup function to disconnect and remove listeners
        return () => {
            socket.off('connect');
            socket.off('all-devices');
            socket.off('device-state-changed');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, []); // Empty dependency array to ensure this runs only once

    return allDevices;
};
