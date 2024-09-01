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

// WebSocket connection handling
document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    let socket;

    function setupWebSocket() {
        socket = new WebSocket('ws://192.168.1.147:8000/ws');

        socket.onopen = () => {
            console.log('WebSocket connection established.');
            socket.send('Hello Server!');
        };

        socket.onmessage = (event) => {
            const message = document.createElement('p');
            message.textContent = `Message from server: ${event.data}`;
            messagesDiv.appendChild(message);

            // Optionally, process the WebSocket data
            processWebSocketData(event.data);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
            // Optionally, attempt to reconnect after a delay
            setTimeout(setupWebSocket, 5000); // Try to reconnect after 5 seconds
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    setupWebSocket();

    function processWebSocketData(data) {
        // Example: Update live visualizer or other parts of your UI based on WebSocket data
        const currentTaskElement = document.getElementById('current-task');
        currentTaskElement.textContent = `Task: ${data}`;
        // Further UI updates can be done here based on incoming WebSocket data
    }
});

// Simulating the audio visualizer (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = document.querySelector('.audio-visualizer');
    let isAnimating = true;

    const animateVisualizer = () => {
        if (isAnimating) {
            visualizer.style.boxShadow = `0 0 30px rgba(255, 255, 255, 0.7)`;
        } else {
            visualizer.style.boxShadow = `0 0 10px rgba(255, 255, 255, 0.3)`;
        }
        isAnimating = !isAnimating;
    };

    setInterval(animateVisualizer, 500);
});
