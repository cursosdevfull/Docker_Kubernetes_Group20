import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { id: number, title: string, category: string }[] {
    return [
      // Frontend Development
      { id: 1, title: 'React Fundamentals', category: 'Frontend' },
      { id: 2, title: 'Vue.js 3 Complete Guide', category: 'Frontend' },
      { id: 3, title: 'Angular 17 Masterclass', category: 'Frontend' },
      { id: 4, title: 'Svelte for Beginners', category: 'Frontend' },
      { id: 5, title: 'Next.js Production Ready', category: 'Frontend' },
      { id: 6, title: 'TypeScript Advanced Patterns', category: 'Frontend' },
      { id: 7, title: 'CSS Grid & Flexbox Mastery', category: 'Frontend' },
      { id: 8, title: 'JavaScript ES6+ Deep Dive', category: 'Frontend' },

      // Backend Development
      { id: 9, title: 'Node.js & Express.js', category: 'Backend' },
      { id: 10, title: 'NestJS Enterprise Applications', category: 'Backend' },
      { id: 11, title: 'Python Django Framework', category: 'Backend' },
      { id: 12, title: 'FastAPI Modern Python APIs', category: 'Backend' },
      { id: 13, title: 'Java Spring Boot Microservices', category: 'Backend' },
      { id: 14, title: 'Go Programming Language', category: 'Backend' },
      { id: 15, title: 'Ruby on Rails Development', category: 'Backend' },
      { id: 16, title: 'PHP Laravel Framework', category: 'Backend' },
      { id: 17, title: 'Database Design & PostgreSQL', category: 'Backend' },
      { id: 18, title: 'MongoDB & NoSQL Databases', category: 'Backend' },

      // Infrastructure as Code
      { id: 19, title: 'Terraform Complete Guide', category: 'Infrastructure' },
      { id: 20, title: 'AWS CloudFormation', category: 'Infrastructure' },
      { id: 21, title: 'Ansible Automation', category: 'Infrastructure' },
      { id: 22, title: 'Pulumi Multi-Cloud IaC', category: 'Infrastructure' },
      { id: 23, title: 'Kubernetes YAML Manifests', category: 'Infrastructure' },
      { id: 24, title: 'Docker & Docker Compose', category: 'Infrastructure' },

      // Cloud Platforms
      { id: 25, title: 'AWS Solutions Architect', category: 'Cloud' },
      { id: 26, title: 'Azure Cloud Fundamentals', category: 'Cloud' },
      { id: 27, title: 'Google Cloud Platform GCP', category: 'Cloud' },
      { id: 28, title: 'Kubernetes on Cloud', category: 'Cloud' },
      { id: 29, title: 'Serverless with AWS Lambda', category: 'Cloud' },
      { id: 30, title: 'Multi-Cloud Strategy & Design', category: 'Cloud' }
    ];
  }
}
