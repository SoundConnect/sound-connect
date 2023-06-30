let chatId = null;
let _csrf = document.querySelector("meta[name='_csrf']").getAttribute("content");
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
let newChatButton = document.querySelector("#newMessage");
newChatButton.addEventListener("click", function() {
    document.querySelector("#recipientsInput").value = "";
    document.querySelector(".senderCol").innerHTML = "";
    chatId = null;
    const previousChatElement = document.querySelector(`.chat[data-chatid="${selectedChatId}"]`);
    previousChatElement.classList.remove('selected');
});
document.querySelector("#sendButton").addEventListener("click", sendMessage);

function sendMessage() {
    let messageInput = document.querySelector("#messageInput");
    let message = messageInput.value;

    let recipientsValue = document.querySelector("#recipientsInput").value;
    let recipients = recipientsValue.split(",").map(recipient => recipient.trim());
    let data = {
        recipients: recipients,
        message: message,
        chat: chatId,
    };
    console.log(data)
    if(chatId == null){
        chatId = 0;
    }
    fetch("/profile/" + chatId , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-csrf-token": `${_csrf}`
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            console.log(response)
            if (response.ok) {
                console.log("Message sent successfully!");

                messageInput.value = "";
                loadNewChats();
            } else {
                console.error("Failed to send the message.");
            }
        })
        .catch(function(error) {
            console.error("An error occurred:", error);
        });
}

const chatElements = document.querySelectorAll('.chat');

let selectedChatId = null;

chatElements.forEach(function (chatElement) {
    chatElement.addEventListener('click', function () {

        const chatId = this.getAttribute('data-chatid');

        if (selectedChatId) {
            const previousChatElement = document.querySelector(`.chat[data-chatid="${selectedChatId}"]`);
            previousChatElement.classList.remove('selected');
        }

        this.classList.add('selected');

        selectedChatId = chatId;

        loadMessages(chatId);
        selectChat(chatId);
    });
});


function selectChat(chatId) {
    fetch('/profile/chat/' + chatId) // Replace with your endpoint to fetch chat details
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch chat details');
            }
        })
        .then(function(chat) {
            let participants = chat.chatName;
            document.querySelector('#recipientsInput').value = participants;
        })
        .catch(function(error) {
            console.error(error);
        });
}

function loadMessages(chatId) {
    fetch("/profile/messages/" + chatId)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch messages');
            }
        })
        .then(function(messages) {
            let senderCol = document.querySelector('.senderCol');
            senderCol.innerHTML = '';
            messages.forEach(function(message) {
                let messageWrapper = document.createElement('div');
                let senderWrapper = document.createElement('div');
                let messageElement = document.createElement('div');
                let senderElement = document.createElement('div');

                messageWrapper.classList.add('message-wrapper');
                messageElement.classList.add('message');
                messageElement.textContent = message.message
                senderWrapper.classList.add('sender-wrapper');
                senderElement.classList.add('sender');
                senderElement.textContent = message.sender;

                messageWrapper.appendChild(messageElement);
                senderCol.appendChild(messageWrapper);
                senderWrapper.appendChild(senderElement);
                senderCol.appendChild(senderWrapper);
            });
        })
        .catch(function(error) {
            console.error('An error occurred while loading messages:', error);
        });
}
// function loadChats() {
//
//     fetch('/profile')
//         .then(function(response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Failed to fetch chats');
//             }
//         })
//         .then(function(chats) {
//             let chatsContainer = document.querySelector('#chats');
//             chatsContainer.innerHTML = '';
//
//             chats.forEach(function(chat) {
//                 let chatElement = document.createElement('div');
//                 chatElement.classList.add('chat');
//                 chatElement.textContent = chat.name;
//                 chatElement.addEventListener('click', function() {
//                     loadMessages(chat.id);
//                 });
//
//                 chatsContainer.appendChild(chatElement);
//             });
//         })
//         .catch(function(error) {
//             console.error('An error occurred while loading chats:', error);
//         });
// }
function loadNewChats() {
    fetch('/profile/newchat')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch chats');
            }
        })
        .then(function(chats) {
            let chatsContainer = document.querySelector('#chatMessages');
            chatsContainer.innerHTML = '';
            chats = chats.reverse();

            chats.forEach(function(chat) {
                if (chat.participantIds.includes(userId)) { // Replace `userId` with the user's ID
                    let chatElement = document.createElement('h3');
                    chatElement.textContent = chat.participants;
                    chatElement.classList.add('chat');
                    chatElement.setAttribute('data-chatid', chat.id);

                    chatElement.innerHTML = `${chat.participants}`;
                    chatElement.addEventListener('click', function() {
                        loadMessages(chat.id);
                    });

                    chatsContainer.appendChild(chatElement);
                }
            });

        })
        .catch(function(error) {
            console.error('An error occurred while loading chats:', error);
        });
}

