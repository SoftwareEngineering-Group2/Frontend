import { useEffect, useState, useRef } from 'react';
import ioClient from 'socket.io-client';
import { useToast } from '../app/toastProvider'; // Import the useToast hook

const SERVER_URL = 'https://server-o8if.onrender.com';

export const useSocket = () => {
    const [data, setData] = useState({ allDevices: [], message: [], lastUpdated: null });
    const { showToast } = useToast(); // Destructure showToast from useToast
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = ioClient(SERVER_URL, { reconnection: true });
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('all-devices', (devices) => {
            console.log('Received all devices:', devices);
            setData((prevData) => {
                if (JSON.stringify(prevData.allDevices) !== JSON.stringify(devices)) {
                    return { ...prevData, allDevices: devices, lastUpdated: 'allDevices' };
                }
                return prevData;
            });
        });

        socket.on('device-state-changed', (devices) => {
            console.log('Device state changed:', devices);
            setData((prevData) => {
                if (JSON.stringify(prevData.allDevices) !== JSON.stringify(devices)) {
                    return { ...prevData, allDevices: devices, lastUpdated: 'allDevices' };
                }
                return prevData;
            });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');

        });
        socket.on('sensor-channel', (message) => {
            console.log(message);
            setData((prevData) => ({ ...prevData, message, lastUpdated: 'message' }));
            showToast(message);
          });
          
        return () => {
            socket.off('connect');
            socket.off('all-devices');
            socket.off('device-state-changed');
            socket.off('disconnect');
            socket.off('sensor-channel');
            socket.disconnect();
        };
    }, [showToast]); // Ensure the effect runs only once and when showToast changes

    return data;
};
