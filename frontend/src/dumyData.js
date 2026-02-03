export const dumyData = {
    users: [
        { id: 1, name: "Admin User", email: "admin@crm.com", password: "123", role: "admin" },
        { id: 2, name: "Normal User", email: "user@crm.com", password: "123", role: "user" },
        { id: 3, name: "Employee User", email: "emp@crm.com", password: "123", role: "employee" },
    ],
    leads: [
        { id: 1, name: 'Sarah Johnson', company: 'Innovation Labs', email: 'sarah.j@innovationlabs.com', phone: '+1 555-0123', status: 'Qualified', source: 'Website' },
        { id: 2, name: 'Michael Chen', company: 'Future Tech', email: 'm.chen@futuretech.com', phone: '+1 555-0456', status: 'Contacted', source: 'Referral' }
    ],
    contacts: [{ id: 1, name: 'John Anderson', title: 'CEO', company: 'Acme Corp', email: 'j.anderson@acme.com', phone: '+1 555-1234', lastActivity: '2 days ago' },
    { id: 2, name: 'Lisa Martinez', title: 'CTO', company: 'TechStart Inc', email: 'l.martinez@techstart.com', phone: '+1 555-5678', lastActivity: '5 days ago' },
    { id: 3, name: 'David Brown', title: 'VP Sales', company: 'Digital Solutions', email: 'd.brown@digitalsol.com', phone: '+1 555-9012', lastActivity: '1 week ago' }],

    deals: [{ id: 1, name: 'Enterprise Software License', company: 'Acme Corp', amount: 125000, stage: 'Negotiation', probability: 75, closeDate: '2026-01-30', status: 'In Progress' },
    { id: 2, name: 'Cloud Migration Project', company: 'TechStart Inc', amount: 89500, stage: 'Proposal', probability: 50, closeDate: '2026-02-15', status: 'In Progress' },
    { id: 3, name: 'Annual Subscription', company: 'Digital Solutions', amount: 45000, stage: 'Closed', probability: 100, closeDate: '2026-01-10', status: 'Won' },
    { id: 4, name: 'Consulting Services', company: 'Global Ventures', amount: 67000, stage: 'Closed', probability: 0, closeDate: '2026-01-05', status: 'Lost' }],
    
    tasks: [{ id: 1, task: 'Follow up with Acme Corp', relatedTo: 'Enterprise Software License', dueDate: '2026-01-22', priority: 'High', status: 'In Progress' },
    { id: 2, task: 'Send proposal to TechStart', relatedTo: 'Cloud Migration Project', dueDate: '2026-01-24', priority: 'High', status: 'Pending' },
    { id: 3, task: 'Schedule demo meeting', relatedTo: 'Training Program', dueDate: '2026-01-26', priority: 'Medium', status: 'Pending' },
    { id: 4, task: 'Prepare quarterly report', relatedTo: 'Internal', dueDate: '2026-01-28', priority: 'Low', status: 'Not Started' }]
};