// JavaScript Document
// API Key de OpenAI
const openaiAPIKey = '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'; // Reemplaza con tu clave API de OpenAI
const assistantModel = 'gpt-4o'; // O el modelo que prefieras (GPT-3.5, etc.)

// Elementos del DOM
const chatWidget = document.getElementById("chat-widget");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const closeBtn = document.getElementById("close-btn");

// Mostrar el widget
function showWidget() {
    chatWidget.style.display = 'flex';
}

// Cerrar el widget
closeBtn.addEventListener("click", function() {
    chatWidget.style.display = 'none';
});

// Enviar mensaje a la API de OpenAI
async function sendToOpenAI(message) {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiAPIKey}`,
    };

    const body = JSON.stringify({
        model: assistantModel,
        messages: [{ role: "user", content: message }],
        max_tokens: 150
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });
        const data = await response.json();
        return data.choices[0].message.content; // Obtener la respuesta
    } catch (error) {
        console.error("Error al conectar con OpenAI:", error);
        return "Lo siento, ocurrió un error al procesar tu solicitud.";
    }
}

// Mostrar el mensaje en el chat
function showMessageInWidget(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender === "Usuario" ? "user-message" : "assistant-message"}`;
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Desplazar hacia abajo
}

// Manejar el envío del mensaje
sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (message) {
        showMessageInWidget("Usuario", message);
        userInput.value = "";
        const assistantResponse = await sendToOpenAI(message);
        showMessageInWidget("Asistente", assistantResponse);
    }
});

// Mostrar el widget cuando el usuario haga clic en un botón o en algún evento
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(showWidget, 1000); // Abre el widget después de 1 segundo
});
