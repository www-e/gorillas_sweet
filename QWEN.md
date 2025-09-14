# Qwen Code Rules for Godzilla Bakery Project

## Project Context
This document defines the specific rules and guidelines for the Godzilla Bakery e-commerce project. These rules must be strictly followed to ensure consistency, quality, and alignment with project goals.

## Development Rules

### 1. Planning Phase Requirements
- ALL development must begin with comprehensive research and planning
- NO implementation should begin without proper documentation
- Technical constraints must be thoroughly understood before coding
- Design inspiration must be gathered from relevant sources

### 2. GitHub Pages Constraints
- NO server-side processing is allowed
- NO environment variables can be used for secrets
- ALL functionality must be client-side JavaScript
- Static file structure must be maintained

### 3. Technology Stack
- HTML5 for structure
- Tailwind CSS for styling (with custom configuration)
- Vanilla JavaScript for interactivity
- Supabase for backend services (database, auth, storage)
- AOS library for animations

### 4. Security Rules
- NEVER expose Supabase service_role keys in frontend code
- ONLY use Supabase anon key for public access
- ALWAYS implement Row Level Security (RLS) policies
- NO sensitive customer data should be stored in localStorage

### 5. Design Principles
- Modern, colorful aesthetic with bakery-themed elements
- Playful but professional appearance
- Responsive design for all device sizes
- Subtle animations to enhance UX (not distract)
- Warm color palette representing baked goods

### 6. Performance Requirements
- Page load times must be under 3 seconds
- Images must be optimized for web
- Minimal external dependencies
- Efficient JavaScript with no blocking operations

### 7. Accessibility Standards
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper ARIA attributes
- Keyboard navigation support
- Color contrast ratios above 4.5:1

### 8. Code Quality Rules
- Clean, readable code with consistent formatting
- Descriptive variable and function names
- Comments for complex logic
- Modular, reusable components
- No code duplication

### 9. File Structure Rules
- Organized directory structure
- Consistent naming conventions
- Separation of concerns (HTML, CSS, JS)
- Documentation in docs/ directory
- README.md with project overview

### 10. Testing Requirements
- Cross-browser compatibility testing
- Mobile responsiveness verification
- Performance testing
- Accessibility auditing
- User flow validation

## Implementation Guidelines

### Supabase Integration
1. Use only the anon key for frontend initialization
2. Implement RLS policies for all tables
3. Handle authentication only for admin users
4. Use Supabase storage for product images
5. Implement proper error handling for all API calls

### Animation Implementation
1. Use AOS library for scroll-based animations
2. Implement CSS transitions for hover effects
3. Create custom keyframe animations sparingly
4. Ensure animations enhance rather than distract
5. Test performance impact of all animations

### State Management
1. Use localStorage for cart functionality only
2. Implement proper data validation
3. Handle localStorage unavailability gracefully
4. Sync cart state across browser sessions
5. Clear cart after successful order placement

### Error Handling
1. Implement comprehensive error handling
2. Provide user-friendly error messages
3. Log errors for debugging purposes
4. Handle network failures gracefully
5. Validate all user inputs

## Quality Assurance

### Code Review Checklist
- [ ] Follows all Qwen Code Rules
- [ ] No security vulnerabilities
- [ ] Meets performance requirements
- [ ] Complies with accessibility standards
- [ ] Passes cross-browser testing
- [ ] Includes proper documentation
- [ ] Contains adequate comments
- [ ] Follows naming conventions

### Deployment Checklist
- [ ] All files properly organized
- [ ] No development artifacts included
- [ ] Supabase integration tested
- [ ] Mobile responsiveness verified
- [ ] Performance metrics met
- [ ] Accessibility standards confirmed
- [ ] README.md updated
- [ ] Documentation complete

## Approval Process

### Design Approval
1. Wireframes must be reviewed and approved
2. Color palette must be finalized
3. Typography choices must be confirmed
4. Animation concepts must be validated

### Technical Approval
1. Architecture must be reviewed
2. Security implementation must be verified
3. Performance optimization must be confirmed
4. Testing strategy must be approved

### Final Review
1. All project requirements must be met
2. All Qwen Code Rules must be followed
3. Code quality must be verified
4. User experience must be validated

## Revision Control

### Version Management
- All changes must be documented
- Major updates require approval
- Minor fixes can be implemented directly
- Emergency fixes must be documented post-implementation

### Rule Updates
- Rules can only be changed with project lead approval
- All team members must be notified of changes
- Updated rules must be clearly marked with dates
- Previous versions must be archived

## Compliance

### Monitoring
- Code reviews will verify rule compliance
- Automated tools will check for violations
- Manual audits will be conducted periodically
- Violations will be documented and addressed

### Enforcement
- Non-compliance will result in required corrections
- Repeat violations will require additional training
- Severe violations may result in restricted access
- Positive compliance will be recognized and rewarded

## Contact

For questions about these rules, contact the project lead or refer to the project documentation.