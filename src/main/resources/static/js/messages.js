document.addEventListener("DOMContentLoaded", function() {
    let openButton = document.querySelector("#openButton");
    let closeButton = document.querySelector("#closeButton");
    let messageContainer = document.querySelector("#messageContainer");

    openButton.addEventListener("click", function() {
        messageContainer.classList.add("show");
    });

    closeButton.addEventListener("click", function() {
        messageContainer.classList.remove("show");
    });
});
document.querySelector("#sendButton").addEventListener("click", sendMessage);

function sendMessage() {
    let messageInput = document.querySelector("#messageInput");
    let message = messageInput.value;

    let recipientsValue = document.querySelector("#recipientsInput").value;
    let recipients = recipientsValue.split(",").map(recipient => recipient.trim());

    let data = {
        recipients: recipients,
        message: message
    };

    fetch("/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            if (response.ok) {
                console.log("Message sent successfully!");
                // Clear the input field
                messageInput.value = "";
            } else {
                console.error("Failed to send the message.");
            }
        })
        .catch(function(error) {
            console.error("An error occurred:", error);
        });
}
document.querySelectorAll('.chat').forEach(function(chatElement) {
    chatElement.addEventListener('click', function() {
        let chatId = this.getAttribute('data-chatid');
        loadMessages(chatId);
    });
});
function loadMessages(chatId) {
    fetch("/profile/messages/"+ chatId)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch messages');
            }
        })
        .then(function(messages) {
            let messagesContainer = document.querySelector('#messageFeed');
            messagesContainer.innerHTML = '';
            messages.forEach(function(message) {
                let messageElement = document.createElement('div');
                let senderElement = document.createElement('div');
                senderElement.classList.add('sender');
                senderElement.textContent = message.sender;
                messageElement.classList.add('message');
                messageElement.textContent = message.message

                messagesContainer.appendChild(messageElement);
                messagesContainer.appendChild(senderElement);
            });
        })
        .catch(function(error) {
            console.error('An error occurred while loading messages:', error);
        });
}
function loadChats() {

    fetch('/profile')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch chats');
            }
        })
        .then(function(chats) {
            let chatsContainer = document.querySelector('#chats');
            chatsContainer.innerHTML = '';

            chats.forEach(function(chat) {
                let chatElement = document.createElement('div');
                chatElement.classList.add('chat');
                chatElement.textContent = chat.name;
                chatElement.addEventListener('click', function() {
                    loadMessages(chat.id);
                });

                chatsContainer.appendChild(chatElement);
            });
        })
        .catch(function(error) {
            console.error('An error occurred while loading chats:', error);
        });
}
