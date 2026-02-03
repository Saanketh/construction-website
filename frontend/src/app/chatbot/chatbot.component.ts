import { Component, OnInit } from '@angular/core';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  messages: Message[] = [];
  userInput = '';
  isTyping = false;

  // Predefined responses based on keywords
  private responses: { [key: string]: string } = {
    'hello': 'Hello! I\'m Shashi from Prashansaa Builders. How can I help you today?',
    'hi': 'Hello! I\'m Shashi from Prashansaa Builders. How can I help you today?',
    'services': 'We offer: Residential Construction, Commercial Construction, Regularisation/Naksha, and Project Consultation. Which service are you interested in?',
    'what do you do': 'We offer: Residential Construction, Commercial Construction, Regularisation/Naksha, and Project Consultation. Which service are you interested in?',
    'price': 'Project costs vary based on requirements. Would you like to schedule a free consultation for a detailed estimate?',
    'cost': 'Project costs vary based on requirements. Would you like to schedule a free consultation for a detailed estimate?',
    'budget': 'Project costs vary based on requirements. Would you like to schedule a free consultation for a detailed estimate?',
    'contact': 'You can reach us at: Phone: (555) 123-4567, Email: info@prashansaa.com, Address: 408. Midas, Fafadih, Raipur',
    'phone': 'You can reach us at: Phone: (555) 123-4567, Email: info@prashansaa.com, Address: 408. Midas, Fafadih, Raipur',
    'email': 'You can reach us at: Phone: (555) 123-4567, Email: info@prashansaa.com, Address: 408. Midas, Fafadih, Raipur',
    'location': 'We\'re located at 408. Midas, Fafadih, Raipur, Chhattisgarh. Come visit us!',
    'address': 'We\'re located at 408. Midas, Fafadih, Raipur, Chhattisgarh. Come visit us!',
    'where': 'We\'re located at 408. Midas, Fafadih, Raipur, Chhattisgarh. Come visit us!',
    'project': 'We handle both residential and commercial projects. What type of project are you planning?',
    'residential': 'We handle both residential and commercial projects. What type of project are you planning?',
    'commercial': 'We handle both residential and commercial projects. What type of project are you planning?',
    'naksha': 'We specialize in building regulation approvals and regularisation. Our experts will guide you through the entire process.',
    'regularisation': 'We specialize in building regulation approvals and regularisation. Our experts will guide you through the entire process.',
    'consultation': 'We offer free consultations! Would you like to schedule a meeting with our team?',
    'meet': 'We offer free consultations! Would you like to schedule a meeting with our team?',
    'thank': 'You\'re welcome! Feel free to ask if you have any other questions.',
    'thanks': 'You\'re welcome! Feel free to ask if you have any other questions.',
    'bye': 'Goodbye! Have a great day. We look forward to helping you build your dream!',
    'goodbye': 'Goodbye! Have a great day. We look forward to helping you build your dream!'
  };

  quickActions = [
    { label: 'Services', icon: 'fa-briefcase' },
    { label: 'Contact', icon: 'fa-phone' },
    { label: 'Pricing', icon: 'fa-tag' },
    { label: 'Location', icon: 'fa-map-marker-alt' }
  ];

  ngOnInit(): void {
    // Add initial greeting
    this.addBotMessage('Hello! I\'m Shashi from Prashansaa Builders. How can I help you today? 👋');
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  closeChat(): void {
    this.isOpen = false;
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim();
    this.addUserMessage(userMessage);
    this.userInput = '';

    // Show typing indicator
    this.isTyping = true;

    // Simulate typing delay
    setTimeout(() => {
      this.isTyping = false;
      const response = this.getResponse(userMessage.toLowerCase());
      this.addBotMessage(response);
    }, 1000);
  }

  handleQuickAction(action: string): void {
    this.addUserMessage(action);
    this.isTyping = true;
    
    setTimeout(() => {
      this.isTyping = false;
      const response = this.getResponse(action.toLowerCase());
      this.addBotMessage(response);
    }, 800);
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      text: text,
      isUser: true,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text: text,
      isUser: false,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private getResponse(input: string): string {
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(this.responses)) {
      if (input.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return 'I\'m not sure about that. You can contact us directly at (555) 123-4567 or email info@prashansaa.com for detailed assistance.';
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messageArea = document.querySelector('.chat-messages');
      if (messageArea) {
        messageArea.scrollTop = messageArea.scrollHeight;
      }
    }, 100);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
