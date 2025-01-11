from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import random

app = Flask(__name__)
CORS(app)
# Configure Gemini AI
genai.configure(api_key="AIzaSyBqWQhdEoTtMd9TVVwlAmdpNNxejNHJLLk")
model = genai.GenerativeModel("gemini-1.5-flash")

# Counter for tracking requests
request_counter = 0

def analyze_business_context(main_prompt, business_type, target_audience, goals, special_events):
    """Analyze user input to create contextual understanding"""
    context = {
        'business_focus': [],
        'audience_traits': [],
        'key_themes': []
    }
    
    # Business context analysis
    business_keywords = {
        'organic': 'natural and sustainable products',
        'eco': 'environmentally conscious practices',
        'luxury': 'premium and exclusive offerings',
        'wellness': 'health and well-being focus',
        'local': 'community-centered business',
        'handmade': 'artisanal and unique products',
        'vegan': 'plant-based and ethical products',
        'tech': 'innovative technology solutions'
    }
    
    # Analyze business type for key focuses
    for keyword, context_value in business_keywords.items():
        if keyword in business_type.lower():
            context['business_focus'].append(context_value)
    
    # Analyze target audience for characteristics
    audience_keywords = {
        'health': 'health-conscious individuals',
        'luxury': 'premium product seekers',
        'young': 'younger demographic',
        'professional': 'career-focused individuals',
        'parent': 'family-oriented customers',
        'eco': 'environmentally conscious consumers'
    }
    
    for keyword, context_value in audience_keywords.items():
        if keyword in target_audience.lower():
            context['audience_traits'].append(context_value)
    
    return context

def generate_dynamic_prompt(main_prompt, business_type, target_audience, goals, special_events, posting_days):
    global request_counter
    request_counter += 1
    
    # Get contextual understanding
    context = analyze_business_context(main_prompt, business_type, target_audience, goals, special_events)
    
    # Build business context string
    business_context = ""
    if context['business_focus']:
        business_context = f" that specializes in {', '.join(context['business_focus'])}"
    
    # Build audience context string
    audience_context = ""
    if context['audience_traits']:
        audience_context = f" (specifically {', '.join(context['audience_traits'])})"
    
    # Build theme context string
    theme_context = ""
    if context['key_themes']:
        theme_context = f" Incorporate content themes around {', '.join(context['key_themes'])}."
    
    prompt_templates = [
        f"Generate a {posting_days}-day monthly content plan for a {business_type}{business_context} "
        f"targeting {target_audience}{audience_context}. Focus on {goals}.{theme_context} "
        f"Include creative, non-repetitive ideas that vary by format (posts, stories, videos) "
        f"and incorporate {special_events}. Provide specific content ideas for each posting day.",
        
        f"Create an engaging {posting_days}-day social media strategy for {business_type}{business_context}. "
        f"Your audience consists of {target_audience}{audience_context}. "
        f"The main objectives are {goals}.{theme_context} Consider incorporating {special_events} "
        f"in unique ways. Break down content ideas by day.",
        
        f"Design a {posting_days}-day monthly content calendar for {business_type}{business_context} "
        f"that resonates with {target_audience}{audience_context}. "
        f"Prioritize {goals} while seamlessly integrating {special_events}.{theme_context} "
        f"Provide day-by-day content suggestions that align with these themes.",
        
        f"Develop an innovative {posting_days}-day content approach for {business_type}{business_context} "
        f"that captures the attention of {target_audience}{audience_context}. "
        f"Address {goals} through diverse content formats.{theme_context} "
        f"Highlight {special_events} and include specific daily content ideas."
    ]
    
    if request_counter % 5 == 0:
        return random.choice(prompt_templates)
    return prompt_templates[0]

def generate_content_with_params(prompt, temperature=0.8, top_p=0.8, candidate_count=1):
    """Generate content with specific parameters for diversity"""
    generation_config = {
        'temperature': temperature,    # Higher temperature for more creativity
        'top_p': top_p,               # Nucleus sampling for diverse yet relevant responses
        'candidate_count': candidate_count,  # Number of responses to generate
        'max_output_tokens': 2048,    # Ensure sufficient length for detailed plans
    }
    
    try:
        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )
        return response
    except Exception as e:
        print(f"Error generating content: {str(e)}")
        return None

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/get_default_keywords', methods=['GET'])
def get_default_keywords():
    """Endpoint to get default keywords and themes"""
    return jsonify({
        'custom_keywords': {
            'organic': 'organic products',
            'eco-friendly': 'environmental sustainability',
            'sustainable': 'sustainable practices',
            'handmade': 'artisanal production',
            'premium': 'premium quality',
            'local': 'local sourcing',
            'traditional': 'traditional methods',
            'innovative': 'innovative approach',
            'health': 'health benefits',
            'ethical': 'ethical practices',
            'direct': 'direct sourcing',
            'rare': 'rare/unique products'
        },
        'theme_keywords': {
            'engagement': 'community building',
            'sale': 'promotional content',
            'launch': 'new product introduction',
            'seasonal': 'seasonal themes',
            'education': 'educational content',
            'awareness': 'brand awareness',
            'lifestyle': 'lifestyle content',
            'behind-scenes': 'behind the scenes content'
        }
    })

@app.route('/get_content_plan', methods=['POST'])
def get_content_plan():
    data = request.json
    main_prompt = data.get('main_prompt', '')
    business_type = data.get('business_type', '')
    target_audience = data.get('target_audience', '')
    goals = data.get('goals', '')
    special_events = data.get('special_events', '')
    posting_days = data.get('posting_days', '')
    creativity_level = data.get('creativity_level', 'medium')
    
    # Set temperature and top_p based on creativity level
    temperature_map = {
        'conservative': 0.7,
        'medium': 0.8,
        'creative': 0.9
    }
    
    temperature = temperature_map.get(creativity_level, 0.8)
    top_p = temperature  # Using same value for top_p
    
    prompt = generate_dynamic_prompt(main_prompt, business_type, target_audience, goals, special_events, posting_days)
    response = generate_content_with_params(
        prompt, 
        temperature=temperature,
        top_p=top_p
    )
    
    if response is None:
        return jsonify({
            'error': 'Failed to generate content'
        }), 500
    
    context = analyze_business_context(main_prompt, business_type, target_audience, goals, special_events)
    
    return jsonify({
        'response': response.text,
        'prompt_used': prompt,
        'context_analysis': context,
        'generation_params': {
            'temperature': temperature,
            'top_p': top_p,
            'creativity_level': creativity_level
        }
    })

if __name__ == '__main__':  # Changed from '_main_' to '__main__'
    app.run(debug=True)


