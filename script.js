// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.navbar nav');
const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotModal = document.getElementById('chatbotModal');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const contactForm = document.getElementById('contactForm');
const timelineItems = document.querySelectorAll('.timeline-item');

// EmailJS Configuration - YOUR CREDENTIALS
const EMAILJS_PUBLIC_KEY = "V7FOVEFS_S_z3xEcx";
const EMAILJS_SERVICE_ID = "service_nesec8h";
const EMAILJS_TEMPLATE_ID = "template_blqohva";

// Enhanced Knowledge Base about Yash Gupta
const knowledgeBase = {
  greeting: [
    "Hello! I'm Yash's AI assistant. I can tell you all about his skills, education, projects, and more! What would you like to know? 🤖",
    "Hi there! I'm here to help you learn about Yash Gupta. Ask me anything about his background, skills, or achievements! ✨",
    "Greetings! I'm Yash's virtual assistant. Feel free to ask me about his education, certifications, projects, or technical skills! 🚀"
  ],
  about: [
    "Yash Gupta is a passionate Computer Science and Engineering (AIML) student with a strong focus on problem-solving, innovation, and continuous learning. He enjoys building creative solutions through Data Structures and Algorithms (DSA), Web Development, and exploring Artificial Intelligence and Machine Learning.",
    "Yash is dedicated to bridging the gap between theory and real-world applications. He strives to craft technology that makes life smarter and simpler through innovative solutions.",
    "With a growth mindset and passion for technology, Yash continuously works on enhancing his skills in software development, AI/ML, and web technologies to create meaningful impact."
  ],
  skills: [
    "Yash has expertise in: C/C++ (85%), Data Structures and Algorithms (80%), HTML/CSS/JavaScript (90%), and AI/ML basics (70%). He's particularly strong in web development and problem-solving.",
    "Technical Skills: Programming in C/C++, Problem-solving with DSA, Web Development with HTML/CSS/JS, and foundational knowledge in Artificial Intelligence and Machine Learning.",
    "Yash's skill set includes: Strong programming fundamentals in C/C++, Advanced web development capabilities, Solid understanding of Data Structures, and Basic AI/ML concepts implementation."
  ],
  education: [
    "🎓 Currently pursuing B.Tech in Computer Science (AIML) at Netaji Subhash Engineering College, Kolkata (Aug 2024 – Present)",
    "🏫 Completed Class XII (Science) from Khalsa English High School, Kolkata with 75% marks in 2024",
    "📚 Completed Class X from Khalsa English High School, Kolkata with 81% marks in 2022"
  ],
  certifications: [
    "Yash has earned the prestigious Oracle Cloud Infrastructure (OCI) 2025 Generative AI Professional Certification! This demonstrates his expertise in leveraging Oracle Cloud's AI services to design, train, and deploy intelligent solutions.",
    "Certification Details: Oracle Cloud Infrastructure 2025 Generative AI Professional - Shows proficiency in Generative AI concepts, large language models (LLMs), and AI-driven system integration using OCI tools.",
    "Professional Certification: Oracle OCI Generative AI Professional - Validates his ability to solve real-world business challenges using cutting-edge AI technologies and cloud services."
  ],
  projects: [
    "💻 Personal Portfolio Website: A responsive portfolio built with HTML, CSS, and JavaScript showcasing his skills and achievements with modern design principles.",
    "📊 Student Result Management System: A C++ application using file handling and OOP concepts to manage and calculate student results efficiently.",
    "🚀 Project Portfolio: Includes web development projects and system-level applications demonstrating both frontend skills and backend logic implementation."
  ],
  contact: [
    "📧 Email: yashgupta8910890643@gmail.com",
    "💼 LinkedIn: linkedin.com/in/yash-gupta-09ba50316",
    "👨‍💻 GitHub: github.com/ventelite-dotcom",
    "You can reach Yash through email for collaborations, or connect with him on LinkedIn and GitHub to see his latest work and contributions!"
  ],
  experience: [
    "Yash is currently focused on his academic journey while building personal projects and enhancing his technical skills through certifications and practical implementations.",
    "As an aspiring software engineer, Yash gains experience through academic projects, personal coding practice, and continuous learning in emerging technologies.",
    "His experience includes developing web applications, working with AI concepts, and building strong foundations in computer science principles."
  ],
  interests: [
    "Yash is passionate about Artificial Intelligence, Machine Learning, Web Development, and solving complex problems through programming.",
    "His interests include exploring new technologies, contributing to open-source projects, and staying updated with the latest trends in software development.",
    "Beyond coding, Yash enjoys learning about innovative tech solutions and how they can be applied to solve real-world challenges effectively."
  ],
  goals: [
    "Yash aims to become a skilled software engineer specializing in AI/ML technologies while creating impactful solutions that bridge technology and human needs.",
    "His goals include mastering full-stack development, deepening his AI/ML expertise, and contributing to meaningful projects that make a difference.",
    "Future aspirations: To work on cutting-edge technology projects, continue learning and growing in the tech field, and eventually lead innovative tech initiatives."
  ],
  default: [
    "I'm not sure I understand. Could you rephrase your question about Yash? 🤔",
    "I don't have specific information about that. Try asking about Yash's skills, education, projects, certifications, or background! 💡",
    "I'm designed to answer questions about Yash Gupta. Could you ask something about his technical skills, education journey, or projects? 🎯",
    "Let me help you learn about Yash! Try questions like 'What are his skills?' or 'Tell me about his education' or 'What projects has he worked on?' ✨"
  ]
};

// Chatbot conversation flow
let conversationHistory = [];
let isFirstInteraction = true;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', handleScroll);
  
  // Mobile menu toggle
  navToggle.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Chatbot functionality
  chatbotWidget.addEventListener('click', openChatbot);
  chatbotClose.addEventListener('click', closeChatbot);
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', handleChatbotInput);
  
  // Contact form submission
  contactForm.addEventListener('submit', handleFormSubmitWithEmail);
  
  // Initialize animations
  initializeSkillBars();
  initializeTimelineAnimation();
  
  // Add floating particles
  createFloatingParticles();
  
  // Handle profile image error
  handleProfileImage();
}

// Handle profile image loading
function handleProfileImage() {
  const profileImg = document.querySelector('.profile-container img');
  const placeholder = document.querySelector('.profile-placeholder');
  
  if (profileImg) {
    profileImg.onerror = function() {
      this.style.display = 'none';
      if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = '<i class="fas fa-user"></i>';
      }
    };
    
    // Check if image loaded successfully
    if (profileImg.complete && profileImg.naturalHeight === 0) {
      profileImg.style.display = 'none';
      if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = '<i class="fas fa-user"></i>';
      }
    }
  }
}

// Scroll handling
function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Animate timeline items on scroll
  animateOnScroll();
}

// Mobile menu functions
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  animateHamburger();
}

function closeMobileMenu() {
  navMenu.classList.remove('active');
  resetHamburger();
}

function animateHamburger() {
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    resetHamburger();
  }
}

function resetHamburger() {
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = 'none';
  spans[1].style.opacity = '1';
  spans[2].style.transform = 'none';
}

// Chatbot functions
function openChatbot() {
  chatbotModal.classList.add('active');
  chatbotInput.focus();
  
  if (isFirstInteraction) {
    setTimeout(() => {
      addBotMessage("Hello! I'm Yash's AI assistant. I can tell you all about his skills, education, projects, and more! What would you like to know? 🤖");
      isFirstInteraction = false;
    }, 500);
  }
}

function closeChatbot() {
  chatbotModal.classList.remove('active');
}

function handleChatbotInput(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message === '') return;
  
  // Add user message to chat
  addUserMessage(message);
  chatbotInput.value = '';
  
  // Process and respond
  setTimeout(() => {
    processUserMessage(message);
  }, 800);
}

function addUserMessage(message) {
  const messageElement = createMessageElement(message, 'user');
  chatbotMessages.appendChild(messageElement);
  scrollToBottom();
  
  // Add to conversation history
  conversationHistory.push({ type: 'user', content: message });
}

function addBotMessage(message) {
  const messageElement = createMessageElement(message, 'bot');
  chatbotMessages.appendChild(messageElement);
  scrollToBottom();
  
  // Add typing indicator
  showTypingIndicator();
  
  // Simulate typing delay
  setTimeout(() => {
    hideTypingIndicator();
    messageElement.style.display = 'flex';
    
    // Add to conversation history
    conversationHistory.push({ type: 'bot', content: message });
  }, Math.min(message.length * 30, 1500));
}

function createMessageElement(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}-message`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `<p>${message}</p>`;
  
  messageDiv.appendChild(contentDiv);
  
  if (type === 'bot') {
    messageDiv.style.display = 'none';
  }
  
  return messageDiv;
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message typing-indicator';
  typingDiv.id = 'typingIndicator';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  
  typingDiv.appendChild(contentDiv);
  chatbotMessages.appendChild(typingDiv);
  scrollToBottom();
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function scrollToBottom() {
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Advanced message processing with NLP-like functionality
function processUserMessage(message) {
  const lowerMessage = message.toLowerCase();
  let response = '';
  
  // Enhanced keyword matching with context awareness
  if (containsAny(lowerMessage, ['hi', 'hello', 'hey', 'hola', 'namaste'])) {
    response = getRandomResponse('greeting');
  } 
  else if (containsAny(lowerMessage, ['about', 'who', 'introduce', 'tell me about'])) {
    response = getRandomResponse('about');
  }
  else if (containsAny(lowerMessage, ['skill', 'what can', 'expert', 'proficient', 'technology'])) {
    response = getRandomResponse('skills');
  }
  else if (containsAny(lowerMessage, ['education', 'study', 'college', 'school', 'degree', 'academic'])) {
    response = getRandomResponse('education');
  }
  else if (containsAny(lowerMessage, ['certificat', 'qualification', 'oracle', 'oci', 'generative ai'])) {
    response = getRandomResponse('certifications');
  }
  else if (containsAny(lowerMessage, ['project', 'work', 'build', 'create', 'develop'])) {
    response = getRandomResponse('projects');
  }
  else if (containsAny(lowerMessage, ['contact', 'email', 'linkedin', 'github', 'reach', 'connect'])) {
    response = getRandomResponse('contact');
  }
  else if (containsAny(lowerMessage, ['experience', 'work experience', 'professional'])) {
    response = getRandomResponse('experience');
  }
  else if (containsAny(lowerMessage, ['interest', 'hobby', 'passion', 'like', 'enjoy'])) {
    response = getRandomResponse('interests');
  }
  else if (containsAny(lowerMessage, ['goal', 'future', 'aspiration', 'dream', 'want to be'])) {
    response = getRandomResponse('goals');
  }
  else if (containsAny(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
    response = "You're welcome! 😊 Is there anything else you'd like to know about Yash?";
  }
  else if (containsAny(lowerMessage, ['bye', 'goodbye', 'see you', 'exit'])) {
    response = "Thanks for chatting! Feel free to ask more about Yash anytime. Have a great day! 🌟";
  }
  else {
    // Context-aware fallback based on conversation history
    const lastBotMessage = getLastBotMessage();
    if (lastBotMessage && containsAny(lastBotMessage.toLowerCase(), ['skill', 'technology'])) {
      response = "Would you like to know more about any specific technology Yash works with?";
    } else if (lastBotMessage && containsAny(lastBotMessage.toLowerCase(), ['project'])) {
      response = "Would you like more details about any particular project Yash has worked on?";
    } else {
      response = getRandomResponse('default');
    }
  }
  
  addBotMessage(response);
}

// Utility functions
function containsAny(str, keywords) {
  return keywords.some(keyword => str.includes(keyword));
}

function getRandomResponse(category) {
  const responses = knowledgeBase[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getLastBotMessage() {
  for (let i = conversationHistory.length - 1; i >= 0; i--) {
    if (conversationHistory[i].type === 'bot') {
      return conversationHistory[i].content;
    }
  }
  return null;
}

// Animation functions
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.bar span');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

function initializeTimelineAnimation() {
  // Will be animated on scroll
}

function animateOnScroll() {
  timelineItems.forEach(item => {
    const position = item.getBoundingClientRect();
    if (position.top < window.innerHeight * 0.8) {
      item.classList.add('visible');
    }
  });
}

// Email Form Handling
function handleFormSubmitWithEmail(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  
  // Show loading state
  btnText.style.display = 'none';
  btnLoader.style.display = 'flex';
  submitBtn.disabled = true;
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    to_email: 'yashgupta8910890643@gmail.com',
    time: new Date().toLocaleString()
  };
  
  console.log('Sending email with data:', formData);
  
  // Send email using EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      showFormMessage('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    })
    .catch(function(error) {
      console.log('FAILED...', error);
      showFormMessage('❌ Failed to send message. Please try again or email me directly.', 'error');
    })
    .finally(function() {
      // Reset button state
      btnText.style.display = 'block';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;
    });
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Floating particles effect
function createFloatingParticles() {
  const artBg = document.querySelector('.art-bg');
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'bubble';
    particle.style.width = `${Math.random() * 100 + 50}px`;
    particle.style.height = particle.style.width;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.background = getRandomGradient();
    artBg.appendChild(particle);
  }
}

function getRandomGradient() {
  const gradients = [
    'linear-gradient(135deg, #6C63FF 0%, #36D1DC 100%)',
    'linear-gradient(135deg, #FF6584 0%, #FFD166 100%)',
    'linear-gradient(135deg, #2D2B55 0%, #6C63FF 100%)'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

// Add CSS for typing indicator and form elements
const style = document.createElement('style');
style.textContent = `
  .typing-indicator .message-content {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  .typing-dots {
    display: flex;
    gap: 4px;
  }
  
  .typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    animation: typingBounce 1.4s infinite ease-in-out;
  }
  
  .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
  .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes typingBounce {
    0%, 80%, 100% { 
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% { 
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Form loader styles */
  .btn-loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Form message styles */
  .form-message {
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    font-weight: 500;
    transition: var(--transition);
  }

  .form-message.success {
    background: rgba(46, 204, 113, 0.1);
    color: #27ae60;
    border: 1px solid rgba(46, 204, 113, 0.3);
  }

  .form-message.error {
    background: rgba(231, 76, 60, 0.1);
    color: #c0392b;
    border: 1px solid rgba(231, 76, 60, 0.3);
  }

  /* Profile placeholder */
  .profile-placeholder {
    width: 100%;
    height: 100%;
    background: var(--gradient-1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 4rem;
  }
`;
document.head.appendChild(style);