import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
  status: string;
  sqft: string;
  completionDate: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  steps: ServiceStep[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
}

export interface Newsletter {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  private servicesData: Service[] = [
    {
      id: 1,
      title: 'Residential Construction',
      description: 'From dream homes to family residences, we build spaces where memories are made. Our residential construction services focus on quality, durability, and creating homes that reflect your unique lifestyle.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      icon: 'fa-home',
      steps: [
        { step: 1, title: 'Initial Communication', description: 'We begin with understanding your vision, requirements, and budget constraints through detailed consultations.' },
        { step: 2, title: 'Cost Estimation', description: 'Transparent and detailed cost breakdown including materials, labor, and timeline estimates.' },
        { step: 3, title: 'Planning & Design', description: 'Our architects create detailed plans with 3D visualizations to help you visualize your future home.' },
        { step: 4, title: 'Project Implementation', description: 'Skilled craftsmen execute the construction with precision and adherence to timelines.' },
        { step: 5, title: 'Project Supervision', description: 'Daily site monitoring and quality checks ensure everything meets our high standards.' },
        { step: 6, title: 'Acknowledgment', description: 'Regular updates and milestone celebrations keep you involved throughout the journey.' },
        { step: 7, title: 'Final Delivery', description: 'Handover of your completed home with all documentation and warranties in place.' }
      ]
    },
    {
      id: 2,
      title: 'Commercial Construction',
      description: 'We build commercial spaces that drive business success. From offices to retail spaces, our commercial projects are designed for functionality, aesthetics, and growth.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      icon: 'fa-building',
      steps: [
        { step: 1, title: 'Business Consultation', description: 'Understanding your business needs, target audience, and operational requirements.' },
        { step: 2, title: 'Site Analysis', description: 'Evaluating location suitability, regulations, and infrastructure requirements.' },
        { step: 3, title: 'Financial Planning', description: 'Detailed budget allocation with ROI considerations and phased investment options.' },
        { step: 4, title: 'Architectural Design', description: 'Creating functional layouts that optimize space utilization and workflow efficiency.' },
        { step: 5, title: 'Regulatory Compliance', description: 'Navigating permits, licenses, and ensuring all legal requirements are met.' },
        { step: 6, title: 'Construction Execution', description: 'Professional construction with minimal disruption to surrounding areas.' },
        { step: 7, title: 'Business Handover', description: 'Final inspection, documentation, and seamless transition to operational status.' }
      ]
    },
    {
      id: 3,
      title: 'Regularisation / Naksha',
      description: 'Navigate the complex world of building regulations with ease. Our Naksha services ensure your construction is fully compliant with local municipal laws and regulations.',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      icon: 'fa-file-alt',
      steps: [
        { step: 1, title: 'Document Collection', description: 'Gathering all necessary property documents, previous approvals, and legal papers.' },
        { step: 2, title: 'Site Survey', description: 'Detailed measurement and assessment of the existing structure against approved plans.' },
        { step: 3, title: 'Discrepancy Analysis', description: 'Identifying variations between constructed structure and original approved plans.' },
        { step: 4, title: 'Regularisation Planning', description: 'Developing strategies to bring the structure into compliance with minimal changes.' },
        { step: 5, title: 'Application Filing', description: 'Preparing and submitting regularisation applications to municipal authorities.' },
        { step: 6, title: 'Follow-up & Coordination', description: 'Liaising with officials, attending hearings, and providing additional documentation as needed.' },
        { step: 7, title: 'Approval & Registration', description: 'Obtaining final regularisation certificate and updating property records.' }
      ]
    },
    {
      id: 4,
      title: 'Project Consultation',
      description: 'Expert guidance at every stage of your construction journey. Our consultation services provide professional advice to help you make informed decisions and avoid costly mistakes.',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
      icon: 'fa-comments',
      steps: [
        { step: 1, title: 'Requirement Analysis', description: 'Deep dive into your project goals, constraints, and expectations.' },
        { step: 2, title: 'Feasibility Study', description: 'Assessing technical viability, budget feasibility, and regulatory compliance.' },
        { step: 3, title: 'Site Evaluation', description: 'Professional assessment of land conditions, soil quality, and environmental factors.' },
        { step: 4, title: 'Design Review', description: 'Expert evaluation of architectural plans for constructability and cost optimization.' },
        { step: 5, title: 'Vendor Selection', description: 'Guidance in selecting reliable contractors, suppliers, and material vendors.' },
        { step: 6, title: 'Quality Monitoring', description: 'Regular inspections and quality checks during construction phase.' },
        { step: 7, title: 'Project Completion', description: 'Final snagging, documentation, and handover support with post-completion guidance.' }
      ]
    }
  ];

  private projectsData: Project[] = [
    {
      id: 1,
      title: 'Luxury Villa - Shankar Nagar',
      description: 'A magnificent 4-bedroom villa with modern amenities and landscaped gardens.',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      category: 'Residential',
      location: 'Shankar Nagar',
      status: 'Completed',
      sqft: '4500',
      completionDate: '2024-03'
    },
    {
      id: 2,
      title: 'Commercial Complex - Kamal Vihar',
      description: 'Multi-purpose commercial building with retail spaces and offices.',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      category: 'Commercial',
      location: 'Kamal Vihar',
      status: 'In Progress',
      sqft: '12000',
      completionDate: '2025-06'
    },
    {
      id: 3,
      title: 'Duplex House - Amlidih',
      description: 'Elegant duplex design with contemporary architecture and premium finishes.',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      category: 'Residential',
      location: 'Amlidih',
      status: 'Completed',
      sqft: '3200',
      completionDate: '2023-12'
    },
    {
      id: 4,
      title: 'Office Building - Devendra Nagar',
      description: 'Modern office complex designed for IT companies and startups.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      category: 'Commercial',
      location: 'Devendra Nagar',
      status: 'Yet to plan',
      sqft: '8500',
      completionDate: '2025-12'
    },
    {
      id: 5,
      title: 'Row Houses - Shankar Nagar',
      description: 'Beautiful row house development with shared amenities and parking.',
      imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      category: 'Residential',
      location: 'Shankar Nagar',
      status: 'In Progress',
      sqft: '2100',
      completionDate: '2024-09'
    },
    {
      id: 6,
      title: 'Shopping Plaza - Kamal Vihar',
      description: 'Retail destination with anchor stores and food court.',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      category: 'Commercial',
      location: 'Kamal Vihar',
      status: 'Completed',
      sqft: '15000',
      completionDate: '2024-01'
    }
  ];

  private blogsData: Blog[] = [
    {
      id: 1,
      title: 'The Future of Sustainable Construction in Raipur',
      excerpt: 'Discover how eco-friendly building practices are transforming the construction landscape in Chhattisgarh.',
      content: 'Sustainable construction is no longer just a trend—its a necessity. In Raipur, were seeing a significant shift towards green building practices. From using locally sourced materials to implementing rainwater harvesting systems, the focus is on creating structures that are environmentally responsible and resource-efficient throughout their life-cycle. Key practices include: 1) Use of fly ash bricks and AAC blocks, 2) Solar panel integration, 3) Rainwater harvesting, 4) Energy-efficient lighting and HVAC systems, 5) Waste management during construction. At Prashansaa Builders, were committed to incorporating these sustainable practices in all our projects.',
      imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800',
      author: 'Sahithya Rao',
      date: '2024-02-15',
      category: 'Construction Trends'
    },
    {
      id: 2,
      title: 'Navigating Building Regulations: A Homeowners Guide',
      excerpt: 'Understanding the naksha approval process and regularisation requirements in Raipur.',
      content: 'Building regulations can be complex, but theyre essential for safety and legal compliance. In Raipur, the municipal corporation has specific requirements for residential and commercial constructions. This comprehensive guide covers: 1) Building plan approval process, 2) Setback requirements, 3) Height restrictions, 4) Parking norms, 5) Regularisation procedures for existing structures, 6) Common pitfalls to avoid, 7) Timeline expectations. Whether youre building new or regularising an existing structure, understanding these regulations will save you time, money, and legal hassles.',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      author: 'Prashansaa Team',
      date: '2024-01-28',
      category: 'Legal'
    },
    {
      id: 3,
      title: 'Interior Design Trends for 2024',
      excerpt: 'Explore the latest interior design trends that are taking Raipur homes by storm.',
      content: 'The interior design landscape is constantly evolving. For 2024, were seeing several exciting trends emerging in Raipur homes: 1) Biophilic Design - Bringing nature indoors with plants, natural light, and organic materials, 2) Smart Home Integration - Automated lighting, security, and climate control, 3) Multi-functional Spaces - Homes that adapt to work-from-home needs, 4) Earth Tones - Warm, natural color palettes, 5) Statement Lighting - Bold fixtures as focal points, 6) Sustainable Materials - Eco-friendly flooring and furniture, 7) Japandi Style - Japanese minimalism meets Scandinavian comfort. Our gallery showcases how these trends can be implemented in your home.',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      author: 'Design Team',
      date: '2024-01-10',
      category: 'Interior Design'
    }
  ];

  private newslettersData: Newsletter[] = [
    {
      id: 1,
      title: 'Prashansaa Builders Featured in Raipur Times',
      subtitle: 'Recognition for Excellence in Residential Construction',
      content: 'We are thrilled to announce that Prashansaa Builders has been featured in Raipur Times Business section for our commitment to quality construction and customer satisfaction. The article highlights our innovative approach to residential projects in Shankar Nagar and our focus on building not just houses, but homes that foster community living. Our founder Sahithya Rao was quoted saying, "Every brick we lay is a foundation for someones dreams." This recognition motivates us to continue delivering excellence in every project we undertake.',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
      date: '2024-02-20'
    },
    {
      id: 2,
      title: 'Completed 50th Project Milestone',
      subtitle: 'Celebrating Half a Century of Dreams Built',
      content: 'This month marks a significant milestone for Prashansaa Builders—we have successfully completed our 50th project! From humble beginnings to this achievement, our journey has been guided by a simple philosophy: building relationships through quality construction. Each of these 50 projects represents a family or business that trusted us with their dreams. We extend our heartfelt gratitude to our clients, partners, and team members who made this possible. Heres to the next 50 and beyond!',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      date: '2024-01-15'
    },
    {
      id: 3,
      title: 'Community Initiative: Free Consultation Camps',
      subtitle: 'Giving Back to Raipur Community',
      content: 'Prashansaa Builders is launching a series of free construction and legal consultation camps across Raipur. Starting this March, our experts will be available at various locations to provide guidance on building regulations, naksha approvals, and construction planning. The first camp will be held at Fafadih Community Center on March 15th. We believe that knowledge empowers, and by sharing our expertise, we hope to help more people build their dream homes legally and safely.',
      imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800',
      date: '2024-02-05'
    }
  ];

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return of(this.projectsData);
  }

  getServices(): Observable<Service[]> {
    return of(this.servicesData);
  }

  getBlogs(): Observable<Blog[]> {
    return of(this.blogsData);
  }

  getNewsletters(): Observable<Newsletter[]> {
    return of(this.newslettersData);
  }

  sendContactForm(form: ContactForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, form);
  }
}
