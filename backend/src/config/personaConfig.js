// src/config/personaConfig.js

/**
 * This file acts as the "Knowledge Base" for the document intelligence system.
 * Each persona is mapped to a list of topics they are likely interested in.
 * - 'title': This will become the high-quality `section_title` in the output.
 * - 'keywords': These help the semantic search find the most relevant content for that topic.
 */
const personaTopics = {

    // --- Persona for Travel & Leisure ---
    'Travel Planner': [
        {
            title: 'Nightlife and Entertainment',
            keywords: 'nightlife, entertainment, bars, lounges, clubs, party, music, dancing, shows'
        },
        {
            title: 'Coastal Adventures & Water Sports',
            keywords: 'coastal, beach, water sports, sea, coastline, snorkeling, sailing, jet ski, diving, swimming'
        },
        {
            title: 'Culinary Experiences & Dining',
            keywords: 'cuisine, restaurants, food, culinary, wine, dining, cooking classes, local dishes, market'
        },
        {
            title: 'Accommodation & Hotels',
            keywords: 'hotels, accommodation, where to stay, resorts, lodging, booking'
        },
        {
            title: 'City Guides & General Information',
            keywords: 'cities, guide, overview, attractions, region, travel tips, transportation, getting around'
        },
        {
            title: 'General Packing Tips and Tricks',
            keywords: 'packing, tips, tricks, essentials, what to bring, luggage, clothing'
        },
        {
            title: 'Cultural Sites & History',
            keywords: 'culture, history, traditions, museums, historical sites, ruins, art, architecture'
        }
    ],

    // --- Persona for Academic & Research ---
    'PhD Researcher': [
        {
            title: 'Methodology & Experimental Design',
            keywords: 'methodology, methods, experimental setup, procedure, approach, materials'
        },
        {
            title: 'Results & Findings',
            keywords: 'results, findings, outcomes, data analysis, statistics, measurements'
        },
        {
            title: 'Abstract & Introduction',
            keywords: 'abstract, introduction, background, literature review, objective, hypothesis'
        },
        {
            title: 'Conclusion & Discussion',
            keywords: 'conclusion, discussion, future work, limitations, summary of findings'
        },
        {
            title: 'Datasets & Performance Benchmarks',
            keywords: 'dataset, data, benchmark, evaluation, performance, metrics, accuracy'
        }
    ],

    // --- Persona for Business & Finance ---
    'Investment Analyst': [
        {
            title: 'Executive Summary & Overview',
            keywords: 'executive summary, overview, highlights, letter to shareholders, ceo message'
        },
        {
            title: 'Revenue Analysis & Financial Performance',
            keywords: 'revenue, sales, net income, profit, loss, financial statements, growth, performance, earnings'
        },
        {
            title: 'R&D Investments & Innovation Strategy',
            keywords: 'research and development, R&D, innovation, patents, new products, technology'
        },
        {
            title: 'Market Positioning & Competitive Strategy',
            keywords: 'market position, strategy, competitive landscape, competition, SWOT analysis, market share'
        },
        {
            title: 'Risk Factors & Challenges',
            keywords: 'risk factors, risks, challenges, uncertainties, market risks, mitigation'
        },
        {
            title: 'Future Outlook & Guidance',
            keywords: 'outlook, guidance, future plans, projections, forecast, strategy'
        }
    ],

    // --- Persona for Education ---
    'Student': [
        {
            title: 'Key Concepts & Definitions',
            keywords: 'key concepts, definitions, vocabulary, principles, terminology, main ideas'
        },
        {
            title: 'Chapter Summary & Review',
            keywords: 'summary, chapter review, conclusion, key takeaways, recap'
        },
        {
            title: 'Examples & Case Studies',
            keywords: 'example, case study, application, illustration, demonstration'
        },
        {
            title: 'Practice Problems & Review Questions',
            keywords: 'practice problems, exercises, questions, self-assessment, quiz, test'
        },
        {
            title: 'Core Theories & Mechanisms',
            keywords: 'theory, mechanism, formula, equation, process, framework'
        }
    ],

    // --- Persona for Media & Reporting ---
    'Journalist': [
        {
            title: 'Key People & Organizations',
            keywords: 'key individuals, people involved, organizations, companies, stakeholders'
        },
        {
            title: 'Timeline of Events',
            keywords: 'timeline, chronology, sequence of events, history, dates'
        },
        {
            title: 'Key Quotes & Official Statements',
            keywords: 'quote, statement, said, according to, official response, press release, testimony'
        },
        {
            title: 'Background & Context',
            keywords: 'background, context, history, previous events, explanation, analysis'
        },
        {
            title: 'Impact & Consequences',
            keywords: 'impact, consequences, results, effect, aftermath, implications'
        }
    ],
    
    // --- Persona for Corporate Roles ---
    'HR Professional': [
        {
            title: 'Recruitment & Onboarding Policies',
            keywords: 'recruitment, hiring, onboarding, new hire, orientation, sourcing, interviewing'
        },
        {
            title: 'Compensation & Benefits',
            keywords: 'compensation, salary, pay, benefits, insurance, retirement, 401k, remuneration'
        },
        {
            title: 'Performance Management',
            keywords: 'performance review, appraisal, employee evaluation, feedback, goals, objectives'
        },
        {
            title: 'Company Policies & Legal Compliance',
            keywords: 'policy, compliance, legal, regulations, code of conduct, harassment, safety'
        },
        {
            title: 'Training & Career Development',
            keywords: 'training, development, learning, career path, promotion, skills'
        }
    ],

    // --- Persona for Food & Hospitality ---
    'Food Contractor': [
        {
            title: 'Recipes & Ingredients',
            keywords: 'recipe, ingredients, instructions, measurements, preparation'
        },
        {
            title: 'Cooking Methods & Techniques',
            keywords: 'cooking method, technique, baking, frying, grilling, steaming'
        },
        {
            title: 'Menu Planning & Dietary Options',
            keywords: 'menu, planning, dietary restrictions, vegetarian, gluten-free, vegan, allergy'
        },
        {
            title: 'Food Safety & Kitchen Guidelines',
            keywords: 'food safety, hygiene, sanitation, kitchen rules, compliance, haccp'
        },
        {
            title: 'Catering & Buffet Service Information',
            keywords: 'catering, buffet, event planning, serving suggestions, presentation'
        }
    ],

    // --- NEW PERSONAS ---
    'Marketer': [
        {
            title: 'Target Audience & Customer Segments',
            keywords: 'target audience, customer profile, persona, demographics, segmentation'
        },
        {
            title: 'Marketing Strategy & Campaign Goals',
            keywords: 'marketing strategy, campaign, goals, objectives, kpi, budget'
        },
        {
            title: 'Brand Messaging & Positioning',
            keywords: 'brand, messaging, positioning, value proposition, voice, tone'
        },
        {
            title: 'Social Media & Content Strategy',
            keywords: 'social media, content marketing, seo, blog, digital channels'
        },
        {
            title: 'Market Analysis & Competitor Research',
            keywords: 'market analysis, competitor, research, trends, industry'
        }
    ],

    'Lawyer': [
        {
            title: 'Contractual Clauses & Obligations',
            keywords: 'contract, clause, agreement, terms, conditions, obligation, provision'
        },
        {
            title: 'Liability & Risk Assessment',
            keywords: 'liability, risk, indemnity, warranty, disclaimer, legal exposure'
        },
        {
            title: 'Intellectual Property Rights',
            keywords: 'intellectual property, patent, trademark, copyright, trade secret'
        },
        {
            title: 'Regulatory Compliance & Statutes',
            keywords: 'regulation, compliance, statute, law, legal requirement, governance'
        },
        {
            title: 'Dispute Resolution & Litigation',
            keywords: 'dispute, litigation, arbitration, jurisdiction, governing law, lawsuit'
        }
    ],

    'Software Engineer': [
        {
            title: 'API Documentation & Endpoints',
            keywords: 'api, endpoint, documentation, request, response, authentication, sdk'
        },
        {
            title: 'System Architecture & Design',
            keywords: 'architecture, design, diagram, components, infrastructure, microservices'
        },
        {
            title: 'Code Examples & Implementation',
            keywords: 'code example, snippet, implementation, setup, installation, configuration'
        },
        {
            title: 'Performance & Scalability',
            keywords: 'performance, scalability, benchmark, load, latency, throughput'
        },
        {
            title: 'Dependencies & Libraries',
            keywords: 'dependencies, libraries, requirements, versions, packages'
        }
    ]
};

module.exports = { personaTopics };