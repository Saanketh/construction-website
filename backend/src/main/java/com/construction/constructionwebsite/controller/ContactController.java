package com.construction.constructionwebsite.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {
    
    @PostMapping
    public String submitContact(@RequestBody ContactForm contactForm) {
        System.out.println("Received contact form: " + contactForm.toString());
        return "Thank you for contacting us! We will get back to you soon.";
    }
    
    public static class ContactForm {
        private String name;
        private String email;
        private String phone;
        private String message;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        
        @Override
        public String toString() {
            return "ContactForm{name='" + name + "', email='" + email + "', phone='" + phone + "', message='" + message + "'}";
        }
    }
}