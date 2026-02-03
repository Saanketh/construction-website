import { Component } from '@angular/core';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  projectType: 'Residential' | 'Commercial';
  rating: number; // 1..5
  title: string;
  message: string;
  date: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ananya Verma',
      location: 'Shankar Nagar',
      projectType: 'Residential',
      rating: 5,
      title: 'Transparent and trustworthy team',
      message: 'We felt heard from day one. The team explained every step clearly, shared realistic timelines, and kept us updated. The workmanship and finishing quality exceeded our expectations. Most importantly, they treated our home like their own project.',
      date: '2024-12'
    },
    {
      id: 2,
      name: 'Rohit Sharma',
      location: 'Kamal Vihar',
      projectType: 'Commercial',
      rating: 5,
      title: 'Professional execution, on-time delivery',
      message: 'Our commercial site needed disciplined execution and strict supervision. Prashansaa Builders planned the work properly and delivered with minimal delays. Their coordination with vendors and clear cost visibility made the whole process stress-free.',
      date: '2024-10'
    },
    {
      id: 3,
      name: 'Meera Joshi',
      location: 'Amlidih',
      projectType: 'Residential',
      rating: 5,
      title: 'A builder who builds relationships',
      message: 'The way Sahithya Rao and team communicate is rare. We always knew where the project stood. They supported us with planning decisions and helped us avoid mistakes. The home feels exactly like what we imagined.',
      date: '2024-08'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      location: 'Devendra Nagar',
      projectType: 'Commercial',
      rating: 4,
      title: 'Strong supervision and quality checks',
      message: 'Their supervision is a big plus. Quality checks were consistent and they addressed issues quickly. We appreciated the structured approach and clarity in material choices and budget allocation.',
      date: '2024-07'
    },
    {
      id: 5,
      name: 'Pooja Jain',
      location: 'Shankar Nagar',
      projectType: 'Residential',
      rating: 5,
      title: 'Smooth journey from planning to handover',
      message: 'From cost estimation to final handover, everything was organized. The team was responsive, and the final delivery was clean and documented. Highly recommended for families who want peace of mind.',
      date: '2024-05'
    },
    {
      id: 6,
      name: 'Amit Patel',
      location: 'Kamal Vihar',
      projectType: 'Commercial',
      rating: 4,
      title: 'Great coordination with approvals',
      message: 'We needed guidance with approvals and compliance. The team handled the coordination well and kept documentation on track. Their process-first approach saved us time and helped us plan the next phase confidently.',
      date: '2024-03'
    }
  ];

  stars = [1, 2, 3, 4, 5];
}
