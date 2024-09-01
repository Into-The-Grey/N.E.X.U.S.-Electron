// assets/script.js

// Modal handling
document.addEventListener('DOMContentLoaded', () => {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal') + '-modal';
            document.getElementById(modalId).style.display = 'flex';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal') + '-modal';
            document.getElementById(modalId).style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// WebSocket connection handling (as per your original code)
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const messagesDiv = document.getElementById('messages');
    let socket;

    connectButton.addEventListener('click', () => {
        socket = new WebSocket('ws://192.168.1.147:8000/ws');
        socket.onopen = () => {
            console.log('WebSocket connection established.');
            socket.send('Hello Server!');
        };
        socket.onmessage = (event) => {
            const message = document.createElement('p');
            message.textContent = `Message from server: ${event.data}`;
            messagesDiv.appendChild(message);
        };
        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    });
});
